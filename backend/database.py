"""
database.py — Firebase / Firestore initialisation.

Strategy:
  - If FIREBASE_CREDENTIALS_PATH is set AND the file exists → initialise real Firestore.
  - Otherwise → use an in-memory dict store (perfect for dev / demo with no credentials).

All other modules should import `get_db()` which returns the active storage backend.
"""
import uuid
import logging
from datetime import datetime, timezone
from typing import Any

from config import settings
from fastapi import HTTPException

logger = logging.getLogger(__name__)

# ────────────────────────────────────────────────────────
# In-memory fallback store (used when Firebase is absent)
# ────────────────────────────────────────────────────────
_memory_store: dict[str, list[dict]] = {
    "leads": [],
    "applications": [],
}

# ────────────────────────────────────────────────────────
# Firebase setup (optional)
# ────────────────────────────────────────────────────────
_firestore_client = None
_use_firestore = False


def _init_firebase() -> None:
    global _firestore_client, _use_firestore

    creds_path = settings.FIREBASE_CREDENTIALS_PATH
    if not creds_path:
        logger.info("FIREBASE_CREDENTIALS_PATH not set → using in-memory store.")
        return

    try:
        import os
        if not os.path.exists(creds_path):
            logger.warning(f"Firebase credentials file not found at '{creds_path}' → using in-memory store.")
            return

        import firebase_admin
        from firebase_admin import credentials, firestore

        if not firebase_admin._apps:
            cred = credentials.Certificate(creds_path)
            firebase_admin.initialize_app(cred)

        _firestore_client = firestore.client()
        _use_firestore = True
        logger.info("✅  Firebase Firestore initialised successfully.")

    except Exception as exc:
        logger.error(f"Firebase init failed: {exc} → falling back to in-memory store.")


# Run once at import time
_init_firebase()


# ────────────────────────────────────────────────────────
# Unified CRUD helpers (work for both backends)
# ────────────────────────────────────────────────────────

def _now() -> datetime:
    return datetime.now(timezone.utc)


async def save_document(collection: str, data: dict) -> dict:
    """
    Save a document to Firestore (or in-memory).
    Returns the saved document including auto-generated id and created_at.
    """
    doc_id = str(uuid.uuid4())
    doc = {**data, "id": doc_id, "created_at": _now()}

    if _use_firestore:
        try:
            _firestore_client.collection(collection).document(doc_id).set(
                {**doc, "created_at": doc["created_at"].isoformat()}
            )
        except Exception as e:
            logger.error(f"Firestore save_document failed: {e}")
            if "PERMISSION_DENIED" in str(e) or "googleapis.com" in str(e):
                raise HTTPException(
                    status_code=500,
                    detail=(
                        "Cloud Firestore API is disabled or the database has not been created. "
                        "Please go to your Firebase Console, click on 'Firestore Database', and click 'Create Database'."
                    )
                )
            raise HTTPException(status_code=500, detail=f"Database save error: {e}")
    else:
        _memory_store.setdefault(collection, []).append(doc)

    return doc


async def get_all_documents(collection: str) -> list[dict]:
    """
    Retrieve all documents from a collection, newest first.
    """
    if _use_firestore:
        try:
            docs = _firestore_client.collection(collection).stream()
            results = []
            for d in docs:
                entry = d.to_dict()
                # Normalise created_at back to datetime if it came as string
                if isinstance(entry.get("created_at"), str):
                    entry["created_at"] = datetime.fromisoformat(entry["created_at"])
                results.append(entry)
            return sorted(results, key=lambda x: x.get("created_at", _now()), reverse=True)
        except Exception as e:
            logger.error(f"Firestore get_all_documents failed: {e}")
            if "PERMISSION_DENIED" in str(e) or "googleapis.com" in str(e):
                raise HTTPException(
                    status_code=500,
                    detail=(
                        "Cloud Firestore API is disabled or the database has not been created. "
                        "Please go to your Firebase Console, click on 'Firestore Database', and click 'Create Database'."
                    )
                )
            raise HTTPException(status_code=500, detail=f"Database read error: {e}")
    else:
        items = list(_memory_store.get(collection, []))
        return sorted(items, key=lambda x: x.get("created_at", _now()), reverse=True)


async def delete_document(collection: str, doc_id: str) -> bool:
    """
    Delete a document from Firestore (or in-memory).
    Returns True if deletion succeeded, False otherwise.
    """
    global _memory_store
    if _use_firestore:
        try:
            _firestore_client.collection(collection).document(doc_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting doc {doc_id} from {collection}: {e}")
            if "PERMISSION_DENIED" in str(e) or "googleapis.com" in str(e):
                raise HTTPException(
                    status_code=500,
                    detail=(
                        "Cloud Firestore API is disabled or the database has not been created. "
                        "Please go to your Firebase Console, click on 'Firestore Database', and click 'Create Database'."
                    )
                )
            raise HTTPException(status_code=500, detail=f"Database delete error: {e}")
    else:
        if collection in _memory_store:
            original_len = len(_memory_store[collection])
            _memory_store[collection] = [item for item in _memory_store[collection] if item.get("id") != doc_id]
            return len(_memory_store[collection]) < original_len
        return False


def is_using_firestore() -> bool:
    return _use_firestore

