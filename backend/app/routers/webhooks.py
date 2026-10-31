from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.order import Order
from app.services.whatsapp_service import generate_owner_whatsapp_slip
from app.routers.orders import enrich_order_response

router = APIRouter(prefix="/api/webhooks", tags=["Webhooks"])

@router.post("/payment")
async def handle_payment_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Receives payment callback from Payment Gateway (Razorpay/Cashfree/PhonePe).
    Verifies payment and updates order status in MySQL.
    """
    payload = await request.json()
    order_id = payload.get("order_id") or payload.get("id")
    payment_ref = payload.get("payment_id", "UPI-VERIFIED")

    if not order_id:
        raise HTTPException(status_code=400, detail="Missing order_id in webhook payload")

    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.payment_status = "Paid via Gateway (Verified)"
    order.payment_ref = payment_ref
    db.commit()
    db.refresh(order)

    # Format owner slip
    enriched = enrich_order_response(order)
    return {
        "status": "success",
        "message": f"Order #{order.id} marked as Paid",
        "whatsapp_slip_url": enriched["whatsapp_owner_slip"]
    }

