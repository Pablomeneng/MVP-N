from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.models.client import Client
from src.config.database import SessionLocal
from src.middlewares.auth_middleware import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_client(name: str, email: str, phone: str = None, address: str = None, db: Session = Depends(get_db)):
    existing_client = db.query(Client).filter(Client.email == email).first()
    if existing_client:
        raise HTTPException(status_code=400, detail="Client already exists")

    new_client = Client(name=name, email=email, phone=phone, address=address)
    db.add(new_client)
    db.commit()
    return {"message": "Client created successfully"}

@router.get("/")
def get_clients(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(Client).all()

@router.get("/{client_id}")
def get_client(client_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client
