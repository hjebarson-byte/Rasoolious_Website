import random
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderStatusUpdate, OrderOut
from app.services.whatsapp_service import generate_owner_whatsapp_slip, generate_customer_whatsapp_chat

router = APIRouter(prefix="/api/orders", tags=["Orders"])

def enrich_order_response(order: Order) -> dict:
    order_dict = {
        "id": order.id,
        "customer_name": order.customer_name,
        "phone": order.phone,
        "alt_phone": order.alt_phone,
        "address": order.address,
        "locality": order.locality,
        "pincode": order.pincode,
        "slot": order.slot,
        "payment_method": order.payment_method,
        "payment_status": order.payment_status,
        "payment_ref": order.payment_ref,
        "subtotal": order.subtotal,
        "delivery_fee": order.delivery_fee,
        "discount": order.discount,
        "total": order.total,
        "status": order.status,
        "notes": order.notes,
        "has_gift_message": order.has_gift_message,
        "gift_message": order.gift_message,
        "created_at": order.created_at,
        "items": [
            {
                "id": item.id,
                "order_id": item.order_id,
                "product_id": item.product_id,
                "product_name": item.product_name,
                "quantity": item.quantity,
                "weight": item.weight,
                "unit_price": item.unit_price,
                "total_price": item.total_price,
                "selected_flavours": item.selected_flavours
            }
            for item in order.items
        ]
    }
    # Auto-generate WhatsApp links
    order_dict["whatsapp_owner_slip"] = generate_owner_whatsapp_slip(order_dict)
    order_dict["whatsapp_customer_chat"] = generate_customer_whatsapp_chat(order.phone, order.customer_name, order.id)
    return order_dict

@router.get("", response_model=List[OrderOut])
def get_orders(
    status: Optional[str] = Query(None, description="Filter by 'pending' or 'completed'"),
    search: Optional[str] = Query(None, description="Search by customer name, phone, or order ID"),
    db: Session = Depends(get_db)
):
    query = db.query(Order).order_by(Order.created_at.desc())

    if status and status != "all":
        query = query.filter(Order.status == status)

    if search and search.strip():
        q = f"%{search.strip().lower()}%"
        query = query.filter(
            (Order.id.ilike(q)) |
            (Order.customer_name.ilike(q)) |
            (Order.phone.ilike(q)) |
            (Order.locality.ilike(q))
        )

    orders = query.all()
    return [enrich_order_response(o) for o in orders]

@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return enrich_order_response(order)

@router.post("", response_model=OrderOut, status_code=201)
def create_order(order_in: OrderCreate, db: Session = Depends(get_db)):
    # Generate unique ID
    order_id = f"RAS{random.randint(1000, 9999)}"
    while db.query(Order).filter(Order.id == order_id).first():
        order_id = f"RAS{random.randint(1000, 9999)}"

    order = Order(
        id=order_id,
        customer_name=order_in.customer_name,
        phone=order_in.phone,
        alt_phone=order_in.alt_phone,
        address=order_in.address,
        locality=order_in.locality,
        pincode=order_in.pincode,
        slot=order_in.slot,
        payment_method=order_in.payment_method,
        payment_status=order_in.payment_status,
        payment_ref=order_in.payment_ref or f"GATEWAY-{random.randint(100000, 999999)}",
        subtotal=order_in.subtotal,
        delivery_fee=order_in.delivery_fee,
        discount=order_in.discount,
        total=order_in.total,
        status="pending",
        notes=order_in.notes,
        has_gift_message=order_in.has_gift_message,
        gift_message=order_in.gift_message
    )
    db.add(order)
    db.flush()

    # Add items & update product booked counts
    for item_data in order_in.items:
        item = OrderItem(
            order_id=order_id,
            product_id=item_data.product_id,
            product_name=item_data.product_name,
            quantity=item_data.quantity,
            weight=item_data.weight,
            unit_price=item_data.unit_price,
            total_price=item_data.total_price,
            selected_flavours=item_data.selected_flavours
        )
        db.add(item)

        # Increment booked count on matched product
        if item_data.product_id:
            product = db.query(Product).filter(Product.id == item_data.product_id).first()
            if product:
                product.booked = (product.booked or 0) + item_data.quantity
                if product.booked >= product.daily_limit:
                    product.status = "Sold Out"
                elif product.booked >= product.daily_limit - 4:
                    product.status = "Limited Stock"

    db.commit()
    db.refresh(order)
    return enrich_order_response(order)

@router.patch("/{order_id}/status", response_model=OrderOut)
def update_order_status(
    order_id: str, 
    status_in: Optional[OrderStatusUpdate] = None, 
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if status_in and status_in.status:
        order.status = status_in.status
    else:
        # One-click toggle between pending and completed
        order.status = "completed" if order.status != "completed" else "pending"

    db.commit()
    db.refresh(order)
    return enrich_order_response(order)

