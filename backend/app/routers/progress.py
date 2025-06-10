from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models.assignment import Assignment
from ..schemas.assignment import AssignmentRead

router = APIRouter(prefix="/users", tags=["progress"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/{user_id}/progress', response_model=list[AssignmentRead])
def user_progress(user_id: int, db: Session = Depends(get_db)):
    assignments = db.query(Assignment).filter(Assignment.user_id == user_id).all()
    return assignments
