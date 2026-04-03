from pydantic import BaseModel
from typing import List, Dict


class TherapistRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] = []


class TherapistResponse(BaseModel):
    reply: str
    mood: str
    tools: List[str]