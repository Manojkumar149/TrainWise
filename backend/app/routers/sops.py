from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import SessionLocal
from ..models.sop import SOP, Step
from ..models.assignment import Assignment
from ..schemas.sop import SOPCreate, SOPRead
from ..schemas.assignment import AssignmentCreate, AssignmentRead

router = APIRouter(prefix="/sops", tags=["sops"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/create', response_model=SOPRead)
def create_sop(sop: SOPCreate, db: Session = Depends(get_db)):
    db_sop = SOP(title=sop.title, description=sop.description)
    db.add(db_sop)
    db.commit()
    db.refresh(db_sop)
    for step in sop.steps:
        db_step = Step(text=step.text, image_url=step.image_url, video_url=step.video_url, sop_id=db_sop.id)
        db.add(db_step)
    db.commit()
    db.refresh(db_sop)
    return db_sop

@router.get('/{sop_id}', response_model=SOPRead)
def get_sop(sop_id: int, db: Session = Depends(get_db)):
    sop = db.query(SOP).filter(SOP.id == sop_id).first()
    if not sop:
        raise HTTPException(status_code=404, detail="SOP not found")
    return sop

@router.post('/{sop_id}/assign', response_model=AssignmentRead)
def assign_sop(sop_id: int, assignment: AssignmentCreate, db: Session = Depends(get_db)):
    db_assignment = Assignment(sop_id=sop_id, user_id=assignment.user_id, completed=False)
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment
