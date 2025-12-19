from fastapi import APIRouter, UploadFile
import uuid
from ..services.pdf_loader import extract_text_from_pdf
from ..services.vector_store import add_document


router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile):
    doc_id = str(uuid.uuid4())
    path = f"/tmp/{doc_id}.pdf"

    with open(path, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(path)
    add_document(text, doc_id)

    return {"status": "uploaded", "doc_id": doc_id}
