from pydantic import BaseModel , validator

class Login_Data(BaseModel):
    email:str
    password:str
    
    
class User_Data(BaseModel):
    name :str
    email:str
    job_title :str
    age :int
    
class User_Email_Data(BaseModel):
    email:str