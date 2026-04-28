from pydantic import BaseModel
from typing import List, Dict

class Patent(BaseModel):
    title: str
    abstract: str
    country: str
    score: float

class BiasResult(BaseModel):
    dominant_country: str
    bias_risk: str
    country_distribution: Dict[str, int]

class AnalysisResponse(BaseModel):
    idea: str
    similar_patents: List[Patent]
    bias_analysis: BiasResult
    explanation: str