
from fastapi import FastAPI , Depends , Header
from models import User 
from database import get_db , SessionLocal
from sqlalchemy.orm import Session
from datamodels import Login_Data , User_Data , User_Email_Data
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()

# CORS Middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Success Response
def success_response(data):
    return {"data": data, "meta": {"status": 200, "message": "Success"}}

# Error Response
def error_response(status_code , detail):
    return { 'data' : {} , 'meta' :  { 'status' : status_code , 'message' :detail  }  }


# Regex to validate email
def validate_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if re.match(pattern, email):
        return True
    else:
        return False
    


# Root route
@app.get("/")
def root():
    return {"Working": "Hell Yess!"}




# Login Route , Takes email and password as input and returns success if email is admin@admin.com and password is Admin@123
@app.post("/login")
async def login(data:Login_Data):
    email = data.email
    password = data.password
    if (email == "admin@admin.com" and password == "Admin@123"):
        return success_response("Login Success")
    else:
        return error_response(400 , "Invalid Credentials")



# Create User Route , Takes User Data as input and creates a user in the database , and also takes admin password and email as header.
@app.post("/create_user")
async def create_user( data:User_Data, email_id: str = Header(None), password_id: str = Header(None) , db: Session = Depends(get_db)):
    print(data , email_id , password_id)
    if email_id == 'admin@admin.com' and password_id == 'Admin@123':
        email = data.email
        if email is None:
            print('email is none')
            return error_response(400 , "Email is Required")
        
        if not validate_email(email):
            return error_response(400, "Invalid Email Format")

        user_email_in_db = db.query(User).filter(User.email == email).first()
        if user_email_in_db is None:
            user = User(name = data.name , email = data.email , job_title = data.job_title , age = data.age)
            print(data.name ,  data.email , data.job_title , data.age)
            db.add(user)
            db.commit()
            db.refresh(user)
            return success_response("User Created")
        else:
            return error_response(400 , "User Already Exists")
    

# Edit User Route , Takes User Data as input and edits the user in the database , and also takes admin password and email as header.
@app.post("/edit_user")
async def edit_user(data:User_Data , email_id: str = Header(None), password_id: str = Header(None)  , db: Session = Depends(get_db)):
    if email_id == 'admin@admin.com' and password_id == 'Admin@123':

        email = data.email
        
        if email is None:
          return error_response(400 , "Email is Required")
        
        if not validate_email(email):
            return error_response(400, "Invalid Email Format")

        user_email_in_db = db.query(User).filter(User.email == email).first()
        if user_email_in_db:
            user_email_in_db.name = data.name
            user_email_in_db.job_title = data.job_title
            user_email_in_db.age = data.age
            db.commit()        
            return success_response("User Updated")
        else:
            return error_response(400 , "User Does not Exist in DB.")
    
    
# Delete User Route , Takes User Email as input and deletes the user in the database , and also takes admin password and email as header.
@app.post("/delete_user")
async def delete_user(data:User_Email_Data , email_id: str = Header(None), password_id: str = Header(None)  , db: Session = Depends(get_db)):
    if email_id == 'admin@admin.com' and password_id == 'Admin@123':

        email = data.email
        if email is None:
            return error_response(400 , "Email is Required")
        
        if not validate_email(email):
            return error_response(400, "Invalid Email Format")

        user_email_in_db = db.query(User).filter(User.email == email).first()
        if user_email_in_db:
            db.delete(user_email_in_db)
            db.commit()
            return success_response("User Deleted")
        else:
            return error_response(400 , "User Does not Exist in DB.")
    


# Get Users Route , Takes admin password and email as header and returns all the users in the database , and also takes admin password and email as header.
@app.get("/get_users")
async def get_users(email: str = Header(None), password: str = Header(None) , db: Session = Depends(get_db)):
    if email is None:
        return error_response(400 , "Email is Required")
    
    if not validate_email(email):
        return error_response(400, "Invalid Email Format")
    
    if email == 'admin@admin.com' and password == 'Admin@123':
        users = db.query(User).all()
        user_list = []
        for user in users:
            user_list.append({"name": user.name , "email": user.email , "job_title": user.job_title , "age": user.age })
        return success_response(user_list)
    else:
        return error_response(400 , "Invalid Credentials")

    
    

