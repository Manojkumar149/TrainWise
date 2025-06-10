from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class UserRead(BaseModel):
    id: int
    email: str
    is_admin: bool

    class Config:
        orm_mode = True
