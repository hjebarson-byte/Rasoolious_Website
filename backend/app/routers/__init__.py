from app.routers.products import router as products_router
from app.routers.orders import router as orders_router
from app.routers.analytics import router as analytics_router
from app.routers.whatsapp import router as whatsapp_router
from app.routers.webhooks import router as webhooks_router
from app.routers.payments import router as payments_router

__all__ = [
    "products_router",
    "orders_router",
    "analytics_router",
    "whatsapp_router",
    "webhooks_router",
    "payments_router"
]
