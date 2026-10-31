from sqlalchemy.orm import Session
from app.models.product import Product
from app.models.order import Order, OrderItem
from app.models.store_setting import StoreSetting

INITIAL_PRODUCTS_DATA = [
    {
        "id": "br-original",
        "name": "The Original",
        "slug": "the-original",
        "category": "Signature Brownies",
        "price": 450.0,
        "sale_price": 420.0,
        "original_price": 480.0,
        "weight": "500g Slab",
        "daily_limit": 25,
        "booked": 0,
        "status": "In Stock",
        "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        "short_description": "Classic chocolate indulgence.",
        "description": "Our timeless signature recipe with dense, glossy crinkled top and molten fudge center. Handcrafted with single-origin Belgian chocolate and French cultured butter.",
        "ingredients": "70% Belgian Dark Chocolate, French Cultured Butter, Organic Brown Sugar, Free-range Eggs, Wheat Flour, Maldon Sea Salt",
        "allergens": "Dairy, Gluten, Eggs",
        "rating": 4.9,
        "reviews": 154
    },
    {
        "id": "br-rasool",
        "name": "The Rasool",
        "slug": "the-rasool",
        "category": "Signature Brownies",
        "price": 490.0,
        "sale_price": 460.0,
        "original_price": 520.0,
        "weight": "500g Slab",
        "daily_limit": 30,
        "booked": 0,
        "status": "In Stock",
        "image": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
        "short_description": "Our special creation, inspired by the love story behind our brand.",
        "description": "Our special creation, inspired by the love story behind our brand. Infused with Bourbon vanilla and Maldon sea salt crystals. Ultra-luxe velvety dark chocolate.",
        "ingredients": "72% Belgian Couverture Chocolate, French Cultured Butter, Bourbon Vanilla Beans, Organic Cane Sugar, Eggs, Maldon Salt Flakes",
        "allergens": "Dairy, Gluten, Eggs",
        "rating": 5.0,
        "reviews": 198
    },
    {
        "id": "br-double-chocolate",
        "name": "Double Chocolate",
        "slug": "double-chocolate",
        "category": "Signature Brownies",
        "price": 480.0,
        "sale_price": 450.0,
        "original_price": 510.0,
        "weight": "500g Slab",
        "daily_limit": 20,
        "booked": 0,
        "status": "In Stock",
        "image": "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80",
        "short_description": "Double the chocolate, double the delight.",
        "description": "Double the chocolate, double the delight. Loaded with molten pockets of dark and milk chocolate folded into rich Dutch cocoa fudge batter.",
        "ingredients": "Belgian Dark Chocolate 70%, Swiss Milk Chocolate Chunks, Dutch Process Cocoa, French Butter, Eggs, Flour",
        "allergens": "Dairy, Gluten, Eggs",
        "rating": 4.9,
        "reviews": 112
    },
    {
        "id": "br-nutella",
        "name": "Nutella",
        "slug": "nutella",
        "category": "Signature Brownies",
        "price": 520.0,
        "sale_price": 490.0,
        "original_price": 550.0,
        "weight": "500g Slab",
        "daily_limit": 25,
        "booked": 0,
        "status": "In Stock",
        "image": "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80",
        "short_description": "A rich chocolate-hazelnut treat.",
        "description": "A rich chocolate-hazelnut treat with roasted hazelnuts and continuous molten rivers of pure Italian Nutella. Decadent, nutty, and irresistible.",
        "ingredients": "Italian Nutella, Roasted Hazelnuts, 60% Dark Cocoa, French Cultured Butter, Free-Range Eggs, Flour",
        "allergens": "Dairy, Gluten, Eggs, Tree Nuts",
        "rating": 4.9,
        "reviews": 167
    },
    {
        "id": "br-biscoff",
        "name": "Biscoff",
        "slug": "biscoff",
        "category": "Signature Brownies",
        "price": 490.0,
        "sale_price": 460.0,
        "original_price": 520.0,
        "weight": "500g Slab",
        "daily_limit": 24,
        "booked": 0,
        "status": "In Stock",
        "image": "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80",
        "short_description": "Chocolate brownies with a caramelised biscuit twist.",
        "description": "Chocolate brownies with a caramelised biscuit twist, swirled with thick molten ribbons of Belgian Lotus Biscoff speculoos spread and crowned with spiced biscuit dust.",
        "ingredients": "Lotus Biscoff Spread, Lotus Speculoos Biscuits, 64% Dark Chocolate, French Butter, Flour, Eggs",
        "allergens": "Dairy, Gluten, Eggs",
        "rating": 4.9,
        "reviews": 145
    },
    {
        "id": "rasoolicious-gift-box",
        "name": "The Rasoolicious Gift Box",
        "slug": "the-rasoolicious-gift-box",
        "category": "Gift Boxes",
        "price": 850.0,
        "sale_price": 850.0,
        "original_price": 950.0,
        "weight": "Box of 4",
        "daily_limit": 15,
        "booked": 0,
        "status": "In Stock",
        "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
        "short_description": "Share a little happiness with a box of brownies made for life's sweetest moments.",
        "description": "Share a little happiness with a box of brownies made for life's sweetest moments. Choose any four brownies from our signature collection. Packed in our luxury keepsake gift box with satin bow.",
        "ingredients": "Selection of 4 Signature Brownies crafted with Belgian Chocolate, French Butter, Lotus Biscoff, Nutella, and Pure Bourbon Vanilla.",
        "allergens": "Dairy, Gluten, Eggs, Tree Nuts",
        "rating": 5.0,
        "reviews": 210
    }
]

def seed_database(db: Session):
    """
    Populates default product catalog and settings if empty.
    """
    # 1. Seed Products (Starts with 0 booked, all In Stock)
    if db.query(Product).count() == 0:
        print("[SEED] Seeding initial 5 Signature Flavours & Gift Box...")
        for p_data in INITIAL_PRODUCTS_DATA:
            product = Product(**p_data)
            db.add(product)
        db.commit()

    # 2. Seed Store Settings
    default_settings = [
        {"key": "store_name", "value": "Rasoolicious", "description": "Bakery Name"},
        {"key": "owner_phone", "value": "9486518486", "description": "WhatsApp dispatch number"},
        {"key": "free_delivery_threshold", "value": "999", "description": "Order subtotal for free delivery"},
        {"key": "standard_delivery_fee", "value": "40", "description": "Standard delivery fee in INR"},
        {"key": "is_store_open", "value": "true", "description": "Whether store is accepting orders today"}
    ]
    for s_data in default_settings:
        if not db.query(StoreSetting).filter(StoreSetting.key == s_data["key"]).first():
            db.add(StoreSetting(**s_data))
    db.commit()

