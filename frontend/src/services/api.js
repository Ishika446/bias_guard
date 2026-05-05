const API_BASE = https://bias-guard.onrender.com;

export async function analyzeIdea(idea, userEmail = null) {
  const res = await fetch(`${API_BASE}/api/v1/analyze/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idea, user_email: userEmail }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Server error: ${res.status}`);
  }

  return await res.json();
}

