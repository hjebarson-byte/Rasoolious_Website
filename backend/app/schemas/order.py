from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class OrderItemCreate(BaseModel):
    product_id: Optional[str] = None
    product_name: str
    quantity: int = 1
    weight: str = "500g Slab"
    unit_price: float
    total_price: float
    selected_flavours: Optional[str] = None

class OrderItemOut(OrderItemCreate):
    id: int

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    alt_phone: Optional[str] = None
    address: str
    locality: str = "Nagercoil Central"
    pincode: str = "629001"
    slot: str = "Standard Slot (9 AM–1 PM)"
    payment_method: str = "UPI"
    payment_status: str = "Paid via Gateway"
    payment_ref: Optional[str] = None
    subtotal: float
    delivery_fee: float = 0.0
    discount: float = 0.0
    total: float
    notes: Optional[str] = None
    has_gift_message: bool = False
    gift_message: Optional[str] = None
    items: List[OrderItemCreate]

class OrderStatusUpdate(BaseModel):
    status: str  # 'pending', 'completed', 'cancelled'

class OrderOut(BaseModel):
    id: str
    customer_name: str
    phone: str
    alt_phone: Optional[str] = None
    address: str
    locality: str
    pincode: str
    slot: str
    payment_method: str
    payment_status: str
    payment_ref: Optional[str] = None
    subtotal: float
    delivery_fee: float
    discount: float
    total: float
    status: str
    notes: Optional[str] = None
    has_gift_message: bool = False
    gift_message: Optional[str] = None
    created_at: datetime
    items: List[OrderItemOut] = []

    # Helper WhatsApp links computed directly
    whatsapp_owner_slip: Optional[str] = None
    whatsapp_customer_chat: Optional[str] = None

    class Config:
        from_attributes = True

