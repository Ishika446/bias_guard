import numpy as np

# Stores the latest idea so search_similar() can use it inside Gemini.
# The pipeline only passes the vector to search_similar(), not the raw text,
# so we cache it here without touching the pipeline signature.
_current_idea: str = ""


def get_embedding(idea: str) -> list:
    """
    Returns a deterministic 384-dim float32 vector for the idea.
    Actual semantic search is handled by Gemini in search.py;
    this keeps the pipeline interface intact.
    """
    global _current_idea
    _current_idea = idea

    seed = abs(hash(idea)) % (2**32)
    rng = np.random.default_rng(seed)
    return rng.random(384).astype("float32").tolist()
