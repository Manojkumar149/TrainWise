from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class SOP(Base):
    __tablename__ = 'sops'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    creator_id = Column(Integer, ForeignKey('users.id'))
    creator = relationship('User')

class Step(Base):
    __tablename__ = 'steps'
    id = Column(Integer, primary_key=True, index=True)
    sop_id = Column(Integer, ForeignKey('sops.id'))
    text = Column(Text)
    image_url = Column(String, nullable=True)
    video_url = Column(String, nullable=True)
    sop = relationship('SOP', back_populates='steps')

SOP.steps = relationship('Step', order_by=Step.id, back_populates='sop')
