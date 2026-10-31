from sqlalchemy import Column, String, Text
from app.database import Base

class StoreSetting(Base):
    __tablename__ = "store_settings"

    key = Column(String(64), primary_key=True, index=True)
    value = Column(Text, nullable=False)
    description = Column(String(256), nullable=True)

