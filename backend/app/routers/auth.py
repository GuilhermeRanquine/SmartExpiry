from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app.database import get_db
from dotenv import load_dotenv
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token
from app.services.auth_service import registrar_usuario, autenticar_usuario, criar_token
from app.models.user import User
from app.services.auth_service import registrar_usuario, autenticar_usuario, criar_token
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

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

@router.get("/me", response_model=UserResponse)
def me(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        usuario_id: str = payload.get("sub")

        if usuario_id is None:
            raise HTTPException(status_code=401, detail="Token inválido.")

        usuario = db.query(User).filter(User.id == int(usuario_id)).first()

        if usuario is None:
            raise HTTPException(status_code=404, detail="Usuário não encontrado.")

        return usuario

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido.")