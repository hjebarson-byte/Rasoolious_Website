from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, ProductStatusUpdate, ProductOut

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("", response_model=List[ProductOut])
def get_products(
    category: Optional[str] = Query(None, description="Filter by category"),
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if category and category != "All":
        query = query.filter(Product.category == category)
    products = query.all()

    # Map available flag
    result = []
    for p in products:
        p_dict = p.__dict__.copy()
        p_dict["available"] = p.status != "Sold Out"
        result.append(p_dict)
    return result

@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter((Product.id == product_id) | (Product.slug == product_id)).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    p_dict = product.__dict__.copy()
    p_dict["available"] = product.status != "Sold Out"
    return p_dict

@router.post("", response_model=ProductOut, status_code=201)
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    existing = db.query(Product).filter(Product.id == product_in.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Product ID already exists")

    product = Product(**product_in.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    
    p_dict = product.__dict__.copy()
    p_dict["available"] = product.status != "Sold Out"
    return p_dict

@router.put("/{product_id}", response_model=ProductOut)
def update_product(product_id: str, product_in: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = product_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    p_dict = product.__dict__.copy()
    p_dict["available"] = product.status != "Sold Out"
    return p_dict

@router.patch("/{product_id}/status", response_model=ProductOut)
def toggle_product_status(product_id: str, status_in: Optional[ProductStatusUpdate] = None, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if status_in and status_in.status:
        product.status = status_in.status
    else:
        # Toggle between In Stock and Sold Out
        product.status = "Sold Out" if product.status == "In Stock" else "In Stock"

    db.commit()
    db.refresh(product)
    p_dict = product.__dict__.copy()
    p_dict["available"] = product.status != "Sold Out"
    return p_dict

