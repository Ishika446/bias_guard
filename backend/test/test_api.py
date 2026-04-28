from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200

def test_analyze():
    response = client.post("/api/v1/analyze/", json={
        "idea": "AI chatbot for shopping"
    })
    assert response.status_code == 200