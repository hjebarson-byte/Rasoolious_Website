from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.order import Order
from app.services.whatsapp_service import generate_daily_summary_link, generate_owner_whatsapp_slip
from app.routers.orders import enrich_order_response

router = APIRouter(prefix="/api/whatsapp", tags=["WhatsApp"])

@router.get("/daily-summary")
def get_daily_summary_url(db: Session = Depends(get_db)):
    orders = db.query(Order).order_by(Order.created_at.desc()).all()
    today_str = date.today().strftime("%A, %d %b %Y")
    url = generate_daily_summary_link(orders, today_str)
    return {
        "date": today_str,
        "whatsapp_url": url,
        "orders_count": len(orders)
    }

@router.get("/order-slip/{order_id}")
def get_order_slip_url(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order_dict = enrich_order_response(order)
    return {
        "order_id": order_id,
        "whatsapp_url": order_dict["whatsapp_owner_slip"]
    }

