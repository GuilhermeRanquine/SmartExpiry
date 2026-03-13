from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token
from app.services.auth_service import registrar_usuario, autenticar_usuario, criar_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/register", response_model=UserResponse, status_code=201)
def register(dados: UserCreate, db: Session = Depends(get_db)):
    try:
        usuario = registrar_usuario(db, dados)
        return usuario
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=Token)
def login(dados: UserLogin, db: Session = Depends(get_db)):
    usuario = autenticar_usuario(db, dados.email, dados.password)

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos."
        )

    token = criar_token({"sub": str(usuario.id), "email": usuario.email})
    return {"access_token": token, "token_type": "bearer"}