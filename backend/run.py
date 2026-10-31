import sys
import os
from pathlib import Path
import uvicorn

# Ensure utf-8 encoding on Windows console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Ensure the backend directory is in Python path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "127.0.0.1")
    print("=====================================================")
    print(">>> Starting Rasoolicious Brownie Atelier API Server")
    print(f">>> URL: http://{host}:{port}")
    print(f">>> Swagger Docs: http://{host}:{port}/docs")
    print(">>> Owner WhatsApp Alerts: +91 94865 18486")
    print("=====================================================")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
