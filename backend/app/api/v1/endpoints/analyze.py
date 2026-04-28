from fastapi import APIRouter
from app.models.request import IdeaRequest
from app.services.pipelines import run_pipeline
from app.db.base import save_query
import os  # ✅ ADD THIS

router = APIRouter()

@router.post("/")
def analyze_idea(request: IdeaRequest):

    # 🔥 ADD THIS RIGHT HERE (BEFORE run_pipeline)
    if not os.getenv("GEMINI_API_KEY"):
        return {"error": "API key missing 🚨"}

    # 🚀 AI PIPELINE
    result = run_pipeline(request.idea)

    # 💾 Persist to MongoDB (safe)
    try:
        save_query(
            user_email=request.user_email or "anonymous",
            idea=request.idea,
            response=result,
        )
    except Exception as e:
        print(f"[MongoDB] save_query failed: {e}")

    return result
