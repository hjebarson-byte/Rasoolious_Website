from typing import Optional
from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    slug: Optional[str] = None
    category: str = "Signature Brownies"
    price: float
    sale_price: Optional[float] = None
    original_price: Optional[float] = None
    weight: str = "500g Slab"
    daily_limit: int = 25
    booked: int = 0
    status: str = "In Stock"  # 'In Stock', 'Limited Stock', 'Sold Out'
    image: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    ingredients: Optional[str] = None
    allergens: Optional[str] = None
    is_signature: bool = True
    fresh_today: bool = True
    featured: bool = True

class ProductCreate(ProductBase):
    id: str

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    sale_price: Optional[float] = None
    weight: Optional[str] = None
    daily_limit: Optional[int] = None
    booked: Optional[int] = None
    status: Optional[str] = None
    description: Optional[str] = None
    ingredients: Optional[str] = None
    allergens: Optional[str] = None

class ProductStatusUpdate(BaseModel):
    status: str

class ProductOut(ProductBase):
    id: str
    available: bool = True
    rating: float = 4.9
    reviews: int = 150

    class Config:
        from_attributes = True

