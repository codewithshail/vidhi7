import os
import uvicorn
from src.core.config import settings

if __name__ == "__main__":
    # Railway provides PORT environment variable
    port = int(os.environ.get("PORT", 8000))
    
    uvicorn.run(
        "src.app:app",
        host="0.0.0.0",
        port=port,
        reload=False,  # Always False for production
    )