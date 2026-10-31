import os
from pathlib import Path
from pydantic_settings import BaseSettings
from typing import List, Union

env_path = Path(__file__).resolve().parent.parent / ".env"

class Settings(BaseSettings):
    APP_NAME: str = "Rasoolicious Brownie Atelier API"
    APP_VERSION: str = "1.0.0"
    DEBUG: Union[bool, str] = True

    # Database: Default to MySQL, with graceful fallback to SQLite
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "mysql+pymysql://root:password@localhost:3306/rasoolicious_db"
    )
    FALLBACK_SQLITE_URL: str = "sqlite:///./rasoolicious.db"

    # Bakery Owner details
    OWNER_PHONE: str = "9486518486"
    OWNER_NAME: str = "Chef Rasool"

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]

    # JWT Authentication
    SECRET_KEY: str = os.getenv("SECRET_KEY", "rasoolicious-atelier-jwt-secret-key-kanniyakumari")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Razorpay Payment Gateway (Real UPI, Cards, Netbanking in INR)
    RAZORPAY_KEY_ID: str = os.getenv("RAZORPAY_KEY_ID", "")
    RAZORPAY_KEY_SECRET: str = os.getenv("RAZORPAY_KEY_SECRET", "")

    # Meta WhatsApp Cloud API (Automated WhatsApp Alerts)
    WHATSAPP_API_TOKEN: str = os.getenv("WHATSAPP_API_TOKEN", "")
    WHATSAPP_PHONE_NUMBER_ID: str = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "")

    # Twilio WhatsApp API (Alternative Automated WhatsApp)
    TWILIO_ACCOUNT_SID: str = os.getenv("TWILIO_ACCOUNT_SID", "")
    TWILIO_AUTH_TOKEN: str = os.getenv("TWILIO_AUTH_TOKEN", "")
    TWILIO_WHATSAPP_NUMBER: str = os.getenv("TWILIO_WHATSAPP_NUMBER", "+14155238886")

    # UltraMsg WhatsApp API (Alternative for Indian Bakeries)
    ULTRAMSG_INSTANCE_ID: str = os.getenv("ULTRAMSG_INSTANCE_ID", "")
    ULTRAMSG_TOKEN: str = os.getenv("ULTRAMSG_TOKEN", "")

    class Config:
        env_file = str(env_path)
        extra = "ignore"

settings = Settings()

