import json
import google.generativeai as genai
from app.core.config import settings
from app.services import embedding as emb_module


def search_similar(vector, k: int = 5) -> list:
    """
    Returns k patent-like results for the current idea using Gemini.

    The pipeline passes only the embedding vector here, not the raw idea text.
    We retrieve the idea from emb_module._current_idea, which get_embedding()
    stores before returning — so the pipeline call order is preserved unchanged.
    """
    idea = emb_module._current_idea
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = f"""You are a patent database expert. Given the following invention idea:
"{idea}"

Return exactly {k} plausible similar patents as a JSON array. Each object must have:
  - "title"    : a realistic patent title (string)
  - "abstract" : a 1-2 sentence description of the patent (string)
  - "country"  : ISO 3166-1 alpha-2 country code (e.g. "US", "CN", "JP", "DE", "KR", "GB", "IN", "FR", "CA")
  - "score"    : a similarity score as a float between 0.50 and 0.99

Make the country distribution realistic and varied — do NOT put all patents in one country.
Return ONLY the raw JSON array with no markdown fences, no explanation, no extra text."""

    response = model.generate_content(prompt)

    # Strip any accidental markdown code fences Gemini might add
    raw = response.text.strip().strip("```json").strip("```").strip()
    patents = json.loads(raw)

    return patents[:k]