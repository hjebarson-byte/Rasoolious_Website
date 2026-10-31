from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.services.seed_data import seed_database
from app.routers import (
    products_router,
    orders_router,
    analytics_router,
    whatsapp_router,
    webhooks_router,
    payments_router
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables in MySQL/SQLite & seed initial products
    print(f"[STARTUP] Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    
    print(f"[STARTUP] {settings.APP_NAME} started successfully!")
    print(f"[STARTUP] Owner WhatsApp Alerts configured to: +91 {settings.OWNER_PHONE}")
    yield
    print(f"[SHUTDOWN] Stopping {settings.APP_NAME}")

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Artisanal Confectionery Operations API for Rasoolicious (FastAPI + MySQL)",
    lifespan=lifespan
)

# CORS Middleware to allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(products_router)
app.include_router(orders_router)
app.include_router(analytics_router)
app.include_router(whatsapp_router)
app.include_router(webhooks_router)
app.include_router(payments_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Rasoolicious Brownie Atelier API",
        "tagline": "A Little Love in Every Bite.",
        "owner_whatsapp": f"+91 {settings.OWNER_PHONE}",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "database": str(engine.url).split("@")[-1] if "@" in str(engine.url) else "sqlite",
        "owner_phone": settings.OWNER_PHONE
    }

