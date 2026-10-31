from typing import List, Dict, Any
from pydantic import BaseModel

class SalesSummaryOut(BaseModel):
    today_revenue: float
    total_revenue: float
    total_orders: int
    pending_orders: int
    delivered_orders: int
    total_slabs_sold: int
    best_sellers: List[Dict[str, Any]]

