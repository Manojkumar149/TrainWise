from typing import Optional, List
from pydantic import BaseModel

class StepCreate(BaseModel):
    text: str
    image_url: Optional[str] = None
    video_url: Optional[str] = None

class StepRead(StepCreate):
    id: int

    class Config:
        orm_mode = True

class SOPCreate(BaseModel):
    title: str
    description: str
    steps: List[StepCreate]

class SOPRead(BaseModel):
    id: int
    title: str
    description: str
    steps: List[StepRead]

    class Config:
        orm_mode = True
