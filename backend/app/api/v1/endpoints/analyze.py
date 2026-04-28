from fastapi import APIRouter
from app.models.request import IdeaRequest
from app.services.pipelines import run_pipeline
from app.db.base import save_query

router = APIRouter()

@router.post("/")
def analyze_idea(request: IdeaRequest):
    result = run_pipeline(request.idea)

    # 💾 Persist to MongoDB (never breaks the API response if DB fails)
    try:
        save_query(
            user_email=request.user_email or "anonymous",
            idea=request.idea,
            response=result,
        )
    except Exception as e:
        print(f"[MongoDB] save_query failed: {e}")

    return result