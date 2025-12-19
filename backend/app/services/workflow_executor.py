from .vector_store import query_context
from .llm import run_llm


def execute_workflow(workflow: list, query: str) -> str:
    context = None

    if "knowledgeBase" in workflow:
        context = query_context(query)

    return run_llm(query, context)
