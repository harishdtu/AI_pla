from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.workflow_executor import execute_workflow

router = APIRouter()

class ChatRequest(BaseModel):
    workflow: list
    query: str

@router.post("")
def chat(req: ChatRequest):
    try:
        print("Workflow:", req.workflow)
        print("Query:", req.query)

        answer = execute_workflow(req.workflow, req.query)
        return {"response": answer}

    except Exception as e:
        print("CHAT ERROR:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
