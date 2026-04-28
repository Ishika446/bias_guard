from app.services.embedding import get_embedding
from app.services.search import search_similar
from app.services.bias import detect_bias
from app.services.llm import generate_explanation

def run_pipeline(idea: str):

    # 1. Embed
    vector = get_embedding(idea)

    # 2. Search
    results = search_similar(vector)

    # 3. Bias
    countries = [r["country"] for r in results]
    bias = detect_bias(countries)

    # 4. Explanation
    explanation = generate_explanation(idea, results, bias)

    return {
        "idea": idea,
        "similar_patents": results,
        "bias_analysis": bias,
        "explanation": explanation
    }