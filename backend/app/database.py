import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

logger = logging.getLogger("uvicorn")

Base = declarative_base()

def get_engine():
    """
    Initializes SQLAlchemy database engine.
    Tries MySQL first; if unavailable, falls back to SQLite seamlessly.
    """
    try:
        if settings.DATABASE_URL.startswith("mysql"):
            # Test MySQL connection
            engine = create_engine(
                settings.DATABASE_URL, 
                pool_pre_ping=True,
                pool_recycle=3600
            )
            with engine.connect() as conn:
                pass
            print(f"[DATABASE] Connected to MySQL database at {settings.DATABASE_URL.split('@')[-1]}")
            return engine
    except Exception as e:
        print(f"[DATABASE WARNING] Could not connect to MySQL: {e}")
        print(f"[DATABASE INFO] Falling back to SQLite database at {settings.FALLBACK_SQLITE_URL}")

    # Fallback to local SQLite
    return create_engine(
        settings.FALLBACK_SQLITE_URL,
        connect_args={"check_same_thread": False}
    )

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    FastAPI dependency that yields a SQLAlchemy database session per request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

