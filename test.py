from app.database.service import create_user
from app.database import getuser
from app.database.db import SessionLocal
from app.database import getuser
from app.control.integrity import handle_integrity, sanitize_handle
from app.auth.otp import *
db = SessionLocal()

print(can_send_otp(purpose="login", id=1))

y = store_otp(
    otp="123456",
    purpose="login",
    contact="1234567890",
    id=1
)
print(y)
print(verify_otp("123456", "login", id=1))

