from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class QuizQuestion(Base):
    __tablename__ = 'quiz_questions'
    id = Column(Integer, primary_key=True, index=True)
    sop_id = Column(Integer, ForeignKey('sops.id'))
    question = Column(String)
    option_a = Column(String)
    option_b = Column(String)
    option_c = Column(String)
    option_d = Column(String)
    correct_option = Column(String)
    sop = relationship('SOP')

class QuizResult(Base):
    __tablename__ = 'quiz_results'
    id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey('assignments.id'))
    score = Column(Integer)
    assignment = relationship('Assignment')
