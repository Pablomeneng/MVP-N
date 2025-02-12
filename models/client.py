from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from src.config.database import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=True)
    address = Column(Text, nullable=True)

    cases = relationship("Case", back_populates="client")
