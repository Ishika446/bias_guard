from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_router
import os

app = FastAPI(title="BiasGuard AI Backend 🚀")

# ✅ Allow frontend (local + deployed)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://your-frontend.vercel.app",  # 🔥 replace later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ API routes
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"status": "Backend running 🚀"}


# ✅ IMPORTANT FOR RAILWAY
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))  # 🔥 dynamic port
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)
