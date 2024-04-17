from sqlalchemy import Boolean, Column , Integer , String , Text
from database import Base

class User(Base):
    __tablename__='user'
    
    id = Column(Integer , primary_key=True , index=True)
    name = Column(String)
    email = Column(String)
    job_title  = Column(String)
    age = Column(Integer)
    gender = Column(String)
