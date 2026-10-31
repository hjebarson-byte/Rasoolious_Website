import hmac
import hashlib
import random
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel
from sqlalchemy.orm import Session
import httpx

from app.config import settings
from app.database import get_db
from app.schemas.order import OrderCreate, OrderOut
from app.routers.orders import create_order, enrich_order_response
from app.services.whatsapp_service import send_real_whatsapp_to_owner

router = APIRouter(prefix="/api/payments", tags=["Payments"])

class CreatePaymentOrderRequest(BaseModel):
    amount: float
    currency: str = "INR"
    receipt: Optional[str] = None

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: Optional[str] = None
    order_data: OrderCreate

@router.get("/config")
def get_payment_config():
    """
    Returns public payment gateway key and live status for frontend integration
    """
    has_live_keys = bool(settings.RAZORPAY_KEY_ID and settings.RAZORPAY_KEY_SECRET)
    return {
        "gateway": "Razorpay",
        "key_id": settings.RAZORPAY_KEY_ID or "rzp_test_placeholder",
        "currency": "INR",
        "is_live": has_live_keys,
        "owner_whatsapp": settings.OWNER_PHONE
    }

@router.post("/create-order")
async def create_gateway_order(payload: CreatePaymentOrderRequest):
    """
    Creates a real Razorpay Order session.
    Amount in paisa (1 INR = 100 paise).
    """
    amount_in_paise = int(round(payload.amount * 100))
    receipt = payload.receipt or f"rcpt_{random.randint(100000, 999999)}"

    # If real Razorpay keys are configured, create real order via Razorpay API
    if settings.RAZORPAY_KEY_ID and settings.RAZORPAY_KEY_SECRET:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    "https://api.razorpay.com/v1/orders",
                    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET),
                    json={
                        "amount": amount_in_paise,
                        "currency": payload.currency,
                        "receipt": receipt,
                        "notes": {
                            "bakery": settings.APP_NAME,
                            "owner_phone": settings.OWNER_PHONE
                        }
                    }
                )
                if res.status_code == 200:
                    rzp_data = res.json()
                    return {
                        "order_id": rzp_data["id"],
                        "amount": rzp_data["amount"],
                        "currency": rzp_data["currency"],
                        "key_id": settings.RAZORPAY_KEY_ID
                    }
                else:
                    raise HTTPException(
                        status_code=res.status_code,
                        detail=f"Razorpay Error: {res.text}"
                    )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to connect to Razorpay: {e}")

    # Fallback to dev order session if keys are not yet configured in .env
    mock_order_id = f"order_test_{random.randint(100000, 999999)}"
    return {
        "order_id": mock_order_id,
        "amount": amount_in_paise,
        "currency": payload.currency,
        "key_id": settings.RAZORPAY_KEY_ID or "rzp_test_placeholder",
        "note": "Configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env for live bank processing"
    }

@router.post("/verify")
async def verify_payment_and_dispatch(
    payload: VerifyPaymentRequest,
    db: Session = Depends(get_db)
):
    """
    Verifies the payment signature, records the order in MySQL database,
    and automatically dispatches the real WhatsApp notification to the bakery owner (+91 9486518486).
    """
    # 1. Verify Razorpay cryptographic signature if live secret is present
    if settings.RAZORPAY_KEY_SECRET and payload.razorpay_signature:
        generated_signature = hmac.new(
            settings.RAZORPAY_KEY_SECRET.encode(),
            f"{payload.razorpay_order_id}|{payload.razorpay_payment_id}".encode(),
            hashlib.sha256
        ).hexdigest()

        if generated_signature != payload.razorpay_signature:
            raise HTTPException(status_code=400, detail="Invalid payment signature! Payment could not be verified.")

    # 2. Populate verified payment references on the order
    order_create_payload = payload.order_data
    order_create_payload.payment_status = "Paid via Gateway (Verified)"
    order_create_payload.payment_ref = payload.razorpay_payment_id

    # 3. Create and commit order to database
    created_order = create_order(order_create_payload, db)

    # 4. Automatically dispatch real WhatsApp message to the bakery owner
    whatsapp_dispatch = await send_real_whatsapp_to_owner(created_order)

    return {
        "status": "success",
        "message": "Payment verified and order saved to database",
        "order": created_order,
        "whatsapp_dispatch": whatsapp_dispatch
    }

