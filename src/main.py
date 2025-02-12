from fastapi import FastAPI
from src.api.auth import router as auth_router
from src.api.clients import router as clients_router
from src.api.cases import router as cases_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(clients_router, prefix="/clients", tags=["Clients"])
app.include_router(cases_router, prefix="/cases", tags=["Cases"])

@app.get("/")
def home():
    return {"message": "Welcome to the Legal Case Management System"}
