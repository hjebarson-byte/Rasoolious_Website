# 🍫 Rasoolicious Brownie Atelier — FastAPI + MySQL Backend

Production-ready backend API service for **Rasoolicious Handcrafted Brownies**, powering dynamic real-time inventory management, customer checkout, payment gateway hooks, and instant WhatsApp dispatch alerts for Chef Rasool (**+91 94865 18486**).

---

## 🚀 Key Highlights & Architecture

- **Framework**: Python 3.10+ / FastAPI (high performance, asynchronous, auto OpenAPI docs).
- **ORM / Database**: SQLAlchemy 2.0 with PyMySQL.
  - **Primary**: MySQL 8.0 (`rasoolicious_db`).
  - **Smart Failover**: Automatic fallback to SQLite (`rasoolicious.db`) if MySQL is not yet configured or offline.
- **WhatsApp Integration**:
  - Auto-generated WhatsApp wa.me links with clean markdown order slips sent directly to bakery owner `9486518486`.
  - Customer 1-click greeting links with order tracking ID.
  - One-click daily dispatch summary link for kitchen operations.
- **CORS Configured**: Ready for Vite React frontend (`http://localhost:5173`).
- **Interactive Documentation**: Auto-generated Swagger UI (`/docs`) and ReDoc (`/redoc`).

---

## 📁 Directory Structure

```
backend/
├── app/
│   ├── models/            # SQLAlchemy Database Models (Product, Order, OrderItem, StoreSetting)
│   ├── schemas/           # Pydantic Schemas for validation and serialization
│   ├── routers/           # FastAPI API route modules (products, orders, analytics, whatsapp, webhooks)
│   ├── services/          # Business logic: seed_data, whatsapp_service
│   ├── config.py          # Environment settings (Owner phone, DB URL, CORS)
│   ├── database.py        # Database engine with MySQL + fallback SQLite
│   └── main.py            # FastAPI main app with lifespan startup & routers
├── venv/                  # Python virtual environment (pre-configured)
├── .env                   # Active environment variables
├── .env.example           # Example environment template
├── requirements.txt       # Dependencies
└── run.py                 # Convenience server runner
```

---

## 🛠️ Quick Start Guide

### 1. Database Setup (MySQL)

Create a MySQL database for the project using MySQL Workbench, phpMyAdmin, or MySQL CLI:

```sql
CREATE DATABASE IF NOT EXISTS rasoolicious_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Update your connection credentials in `backend/.env`:
```ini
DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost:3306/rasoolicious_db
OWNER_PHONE=9486518486
```

> 💡 **Note**: If MySQL is not running or your credentials are not yet configured, the server will **automatically fall back to local SQLite** (`rasoolicious.db`). You can run and test right away without touching anything!

---

### 2. Start the Backend Server

From the root project folder:

```powershell
# Using the pre-installed virtual environment:
.\backend\venv\Scripts\python.exe backend/run.py
```

Or from within the `backend/` folder:

```powershell
cd backend
.\venv\Scripts\activate
python run.py
```

You will see:
```
🍫 Starting Rasoolicious Brownie Atelier API Server
📍 URL: http://127.0.0.1:8000
📖 Swagger Docs: http://127.0.0.1:8000/docs
📞 Owner WhatsApp Alerts: +91 94433 32039
```

---

## 📡 API Endpoints Reference

### 1. Products (`/api/products`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Retrieve all products (supports `?category=Signature Brownies`) |
| `GET` | `/api/products/{id}` | Retrieve single product by ID or slug |
| `POST` | `/api/products` | Add new product to menu |
| `PUT` | `/api/products/{id}` | Update product details |
| `PATCH` | `/api/products/{id}/status` | Toggle product stock status (`In Stock` / `Sold Out`) |

### 2. Orders (`/api/orders`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | Retrieve orders with optional `?status=pending` or search |
| `GET` | `/api/orders/{id}` | Retrieve order details with generated WhatsApp links |
| `POST` | `/api/orders` | Create customer order from Checkout or Admin Panel |
| `PATCH` | `/api/orders/{id}/status` | Toggle order status (`pending` ⇄ `completed`) |

### 3. Analytics (`/api/analytics`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/analytics/summary` | Today's revenue, slabs sold, and top 5 bestsellers |

### 4. WhatsApp Direct Links (`/api/whatsapp`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/whatsapp/daily-summary` | Pre-built wa.me link with daily sales and pending deliveries |
| `GET` | `/api/whatsapp/order-slip/{order_id}` | Pre-built wa.me link with complete order slip for owner |

### 5. Payment Webhooks (`/api/webhooks`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/webhooks/payment` | Webhook receiver for Razorpay / Cashfree payment confirmations |

---

## 📱 Owner Contact Configuration
- Default Owner Phone: **9486518486** (`+91 94865 18486`)
- To update, modify `OWNER_PHONE` in `backend/.env` or `src/config/brand.ts` on the frontend.

