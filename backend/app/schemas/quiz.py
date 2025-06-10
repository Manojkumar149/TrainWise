from typing import List
from pydantic import BaseModel

class QuizQuestionCreate(BaseModel):
    question: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_option: str

class QuizQuestionRead(QuizQuestionCreate):
    id: int

    class Config:
        orm_mode = True

class QuizSubmit(BaseModel):
    answers: List[str]
