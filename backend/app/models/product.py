from sqlalchemy import Column, String, Float, Integer, Boolean, Text
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    slug = Column(String(128), unique=True, index=True)
    category = Column(String(64), default="Signature Brownies")
    price = Column(Float, nullable=False)
    sale_price = Column(Float, nullable=True)
    original_price = Column(Float, nullable=True)
    weight = Column(String(64), default="500g Slab")
    daily_limit = Column(Integer, default=25)
    booked = Column(Integer, default=0)
    status = Column(String(32), default="In Stock")  # 'In Stock', 'Limited Stock', 'Sold Out'
    image = Column(String(512), nullable=True)
    description = Column(Text, nullable=True)
    short_description = Column(String(256), nullable=True)
    ingredients = Column(Text, nullable=True)
    allergens = Column(String(256), nullable=True)
    is_signature = Column(Boolean, default=True)
    fresh_today = Column(Boolean, default=True)
    featured = Column(Boolean, default=True)
    rating = Column(Float, default=4.9)
    reviews = Column(Integer, default=150)

