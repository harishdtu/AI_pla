from typing import Optional, Any

_client: Optional[Any] = None
_collection: Optional[Any] = None

def _init_collection():
    global _client, _collection
    if _client is not None and _collection is not None:
        return
    import chromadb
    _client = chromadb.Client()
    _collection = _client.get_or_create_collection("knowledge")

def add_document(text: str, doc_id: str):
    _init_collection()
    _collection.add(
        documents=[text],
        ids=[doc_id]
    )

def query_context(query: str) -> str:
    _init_collection()
    results = _collection.query(
        query_texts=[query],
        n_results=3
    )
    return " ".join(results["documents"][0])
