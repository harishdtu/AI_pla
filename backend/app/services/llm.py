import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")


def run_llm(query: str, context: str | None = None) -> str:
    try:
        if context:
            prompt = f"""
Context:
{context}

Question:
{query}
"""
        else:
            prompt = query

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
        )

        return response["choices"][0]["message"]["content"]

    except Exception as e:
        # 🔒 NEVER crash backend
        print("LLM call failed:", e)
        return "⚠️ LLM unavailable (quota exceeded or API issue). Backend is working correctly."
