from pydantic import BaseModel
from typing import Optional

class IdeaRequest(BaseModel):
    idea: str
    user_email: Optional[str] = None