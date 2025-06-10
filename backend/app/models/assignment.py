from sqlalchemy import Column, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from ..database import Base

class Assignment(Base):
    __tablename__ = 'assignments'
    id = Column(Integer, primary_key=True, index=True)
    sop_id = Column(Integer, ForeignKey('sops.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    completed = Column(Boolean, default=False)
    sop = relationship('SOP')
    user = relationship('User')
