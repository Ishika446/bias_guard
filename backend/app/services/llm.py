import json
import google.generativeai as genai
from app.core.config import settings


def generate_explanation(idea: str, results: list, bias: dict) -> str:
    """
    Generate a professional bias-analysis narrative using Gemini.
    Signature is unchanged from what pipelines.py expects.
    """
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash")

    patent_summary = "\n".join(
        f"- {p['title']} ({p.get('country', 'Unknown')})" for p in results[:5]
    )

    prompt = f"""You are a patent intelligence analyst specialising in geographic bias detection.

Invention idea: "{idea}"

Similar patents found:
{patent_summary}

Bias analysis result:
- Dominant country: {bias.get('dominant_country', 'N/A')}
- Bias risk level:  {bias.get('bias_risk', 'N/A')}
- Country distribution: {json.dumps(bias.get('country_distribution', {}))}

Write a concise 2-3 paragraph professional analysis covering:
1. How this invention relates to the existing global patent landscape.
2. The geographic concentration detected and what it means for the inventor.
3. Practical recommendations to address or navigate this bias.

Use flowing prose — no bullet points."""

    response = model.generate_content(prompt)
    return response.text.strip()
