from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.models.case import Case
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
def create_case(title: str, description: str, client_id: int, lawyer_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    new_case = Case(title=title, description=description, client_id=client_id, lawyer_id=lawyer_id)
    db.add(new_case)
    db.commit()
    return {"message": "Case created successfully"}

@router.get("/")
def get_cases(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(Case).all()

@router.get("/{case_id}")
def get_case(case_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case

@router.put("/{case_id}")
def update_case(case_id: int, status: str, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    case.status = status
    db.commit()
    return {"message": "Case status updated"}
