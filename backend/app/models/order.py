from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(String(32), primary_key=True, index=True)
    customer_name = Column(String(128), nullable=False)
    phone = Column(String(32), nullable=False, index=True)
    alt_phone = Column(String(32), nullable=True)
    address = Column(Text, nullable=False)
    locality = Column(String(128), default="Nagercoil Central")
    pincode = Column(String(16), default="629001")
    slot = Column(String(64), default="Morning, 9 AM–1 PM")
    payment_method = Column(String(32), default="UPI")  # 'UPI', 'Card', 'COD'
    payment_status = Column(String(64), default="Paid via UPI")
    payment_ref = Column(String(128), nullable=True)
    subtotal = Column(Float, default=0.0)
    delivery_fee = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    total = Column(Float, nullable=False)
    status = Column(String(32), default="pending", index=True)  # 'pending', 'completed', 'cancelled'
    notes = Column(Text, nullable=True)
    has_gift_message = Column(Boolean, default=False)
    gift_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # 1-to-Many Relationship
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(String(32), ForeignKey("orders.id"), nullable=False, index=True)
    product_id = Column(String(64), nullable=True)
    product_name = Column(String(128), nullable=False)
    quantity = Column(Integer, default=1)
    weight = Column(String(64), default="500g Slab")
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    selected_flavours = Column(Text, nullable=True)

    order = relationship("Order", back_populates="items")

