from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models.sop import SOP
from ..models.assignment import Assignment
from ..models.quiz import QuizResult

router = APIRouter(prefix="/admin", tags=["admin"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/dashboard')
def dashboard(db: Session = Depends(get_db)):
    total_sops = db.query(SOP).count()
    pending = db.query(Assignment).filter(Assignment.completed == False).count()
    quiz_scores = db.query(QuizResult).all()
    avg_score = sum(q.score for q in quiz_scores)/len(quiz_scores) if quiz_scores else 0
    return {
        "total_sops": total_sops,
        "pending_assignments": pending,
        "average_quiz_score": avg_score
    }
