# Import FastAPI, a web framework for building APIs in Python
from fastapi import FastAPI, Request
# Import MongoClient to connect to MongoDB
from pymongo.mongo_client import MongoClient
''' Import CORSMiddleware to handle Cross-Origin Resource Sharing (CORS)
This allows the API to be accessed from different origins (e.g., web browsers)'''
from fastapi.middleware.cors import CORSMiddleware







# Create an instance of the FastAPI app
my_app = FastAPI()

# Define the list of allowed origins for CORS (Cross-Origin Resource Sharing)
# Only requests from these origins will be accepted by the API
# Add CORS middleware to the FastAPI app
my_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change to specific origins in production)
    #allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)








# Create a new MongoDB client using the URI above
client = MongoClient("mongodb://Mongodb:27017/")

# Access the 'NotesApp' database
mydb = client["NotesApp"]
# Access the 'Notes' collection within the 'NotesApp' database
mycol = mydb["Notes"]






# Define a route for the root URL ('/')
# When a GET request is made to '/', this function runs
@my_app.get("/")
async def root():
    # Return a simple JSON response
    return {"message": "Hello World"}







# Define a route for adding a note
# When a POST request is made to '/AddNote', this function runs
@my_app.post("/AddNote")
async def recieveNote(request: Request):
    # Parse the incoming JSON request body
    data = await request.json()
    # Insert the received note data into the 'Notes' collection in MongoDB
    mycol.insert_one(data)
    # (Optional) You could return a success message or the inserted note's ID here
    return {"message": "Note added successfully"}






@my_app.delete("/DeleteNote")
async def deleteNote(request: Request):
    data = await request.json()
    mycol.delete_one(data)
    return {"message": "Note deleted successfully"}
