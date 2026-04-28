import os
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

# Load env variables
load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "biasguard_ai")

# 🔗 CONNECT TO MONGODB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# 📦 COLLECTIONS
users_collection = db["users"]
queries_collection = db["queries"]

# ─────────────────────────────────────────────
# 👤 USER OPERATIONS
# ─────────────────────────────────────────────

def create_or_update_user(user_data):
    """
    Stores user info from OAuth login
    """
    user = {
        "email": user_data.get("email"),
        "name": user_data.get("name"),
        "image": user_data.get("image"),
        "provider": user_data.get("provider", "oauth"),
        "updated_at": datetime.utcnow(),
    }

    users_collection.update_one(
        {"email": user["email"]},
        {"$set": user, "$setOnInsert": {"created_at": datetime.utcnow()}},
        upsert=True,
    )

    return user


# ─────────────────────────────────────────────
# 🧠 SAVE AI QUERY + RESPONSE
# ─────────────────────────────────────────────

def save_query(user_email, idea, response):
    """
    Save full AI interaction
    """
    document = {
        "user_email": user_email,
        "idea": idea,
        "response": response,
        "created_at": datetime.utcnow(),
    }

    result = queries_collection.insert_one(document)
    return str(result.inserted_id)


# ─────────────────────────────────────────────
# 📊 GET USER HISTORY
# ─────────────────────────────────────────────

def get_user_history(user_email, limit=10):
    """
    Fetch past queries for a user
    """
    history = list(
        queries_collection
        .find({"user_email": user_email})
        .sort("created_at", -1)
        .limit(limit)
    )

    for item in history:
        item["_id"] = str(item["_id"])

    return history


# ─────────────────────────────────────────────
# 🔍 GET SINGLE QUERY
# ─────────────────────────────────────────────

def get_query_by_id(query_id):
    from bson import ObjectId

    doc = queries_collection.find_one({"_id": ObjectId(query_id)})
    if doc:
        doc["_id"] = str(doc["_id"])
    return doc


# ─────────────────────────────────────────────
# ❌ DELETE USER DATA (optional)
# ─────────────────────────────────────────────

def delete_user_data(user_email):
    queries_collection.delete_many({"user_email": user_email})
    users_collection.delete_one({"email": user_email})