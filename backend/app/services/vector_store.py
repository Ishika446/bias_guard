import faiss
import pickle
import numpy as np
from app.core.config import settings

class VectorStore:
    def __init__(self):
        print("⚡ Loading FAISS index...")
        self.index = faiss.read_index(settings.FAISS_INDEX_PATH)

        print("📦 Loading metadata...")
        with open(settings.METADATA_PATH, "rb") as f:
            self.metadata = pickle.load(f)

        print("✅ Vector DB initialized")

    def search(self, vector, k=5):
        vector = np.array([vector]).astype("float32")

        distances, indices = self.index.search(vector, k)

        results = []

        for i, idx in enumerate(indices[0]):
            if idx == -1:
                continue

            data = self.metadata[idx]

            results.append({
                "title": data["title"],
                "abstract": data["abstract"],
                "country": data["country"],
                "score": float(distances[0][i])
            })

        return results