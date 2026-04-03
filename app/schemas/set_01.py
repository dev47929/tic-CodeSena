from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=60)
    handle: str = Field(min_length=2, max_length=16)
    name: str = Field(min_length=2, max_length=60)
    phone: Optional[str] = Field(default=None, min_length=10, max_length=10)


class LoginRequest(BaseModel):
    identifier: str   # email OR handle
    password: str = Field(min_length=6, max_length=60)


class OTPRequest(BaseModel):
    identifier: str   # email OR handle
   
