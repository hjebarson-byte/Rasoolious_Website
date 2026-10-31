from datetime import datetime, date
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.order import Order, OrderItem
from app.schemas.analytics import SalesSummaryOut

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/summary", response_model=SalesSummaryOut)
def get_sales_summary(db: Session = Depends(get_db)):
    all_orders = db.query(Order).all()
    today_date = date.today()

    today_orders = [o for o in all_orders if o.created_at.date() == today_date] if all_orders else []
    today_revenue = sum([o.total for o in today_orders])
    total_revenue = sum([o.total for o in all_orders])

    pending_count = len([o for o in all_orders if o.status == "pending"])
    delivered_count = len([o for o in all_orders if o.status == "completed"])

    # Total slabs sold
    items = db.query(OrderItem).all()
    total_slabs_sold = sum([i.quantity for i in items])

    # Top selling flavours
    item_counts = (
        db.query(
            OrderItem.product_name,
            func.sum(OrderItem.quantity).label("units_sold"),
            func.sum(OrderItem.total_price).label("revenue")
        )
        .group_by(OrderItem.product_name)
        .order_by(func.sum(OrderItem.quantity).desc())
        .limit(5)
        .all()
    )

    best_sellers = [
        {
            "name": row[0],
            "units_sold": int(row[1] or 0),
            "revenue": float(row[2] or 0.0)
        }
        for row in item_counts
    ]

    return SalesSummaryOut(
        today_revenue=today_revenue,
        total_revenue=total_revenue,
        total_orders=len(all_orders),
        pending_orders=pending_count,
        delivered_orders=delivered_count,
        total_slabs_sold=total_slabs_sold,
        best_sellers=best_sellers
    )

