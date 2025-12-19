from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import chat, documents

app = FastAPI()

# ✅ ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(chat.router, prefix="/chat")
app.include_router(documents.router, prefix="/documents")

# Optional root check
@app.get("/")
def root():
    return {"status": "Backend running"}



