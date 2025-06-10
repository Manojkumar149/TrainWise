from pydantic import BaseModel

class AssignmentCreate(BaseModel):
    sop_id: int
    user_id: int

class AssignmentRead(BaseModel):
    id: int
    sop_id: int
    user_id: int
    completed: bool

    class Config:
        orm_mode = True
