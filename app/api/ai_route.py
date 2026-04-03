# api/ai_route.py

import ollama
from app.auth.deps import get_current_user
from fastapi import APIRouter, Depends
from app.schemas.models import AIRequest
from app.ai.memory_store import get_history, add_message
from app.ai.prompt import SYSTEM_PROMPT


router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/therapist/chat")
def ai_execute(req: AIRequest, user: str = Depends(get_current_user)):
    uid = user["uid"]

    history = get_history(uid)

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *history,
        {"role": "user", "content": req.message}
    ]

    llm_response = ollama.chat(
        model="qwen2.5:7b",
        messages=messages
    )

    output = llm_response["message"]["content"]

    # store both sides
    add_message(uid, "user", req.message)
    add_message(uid, "assistant", output)

    return {
        "response": output
    }