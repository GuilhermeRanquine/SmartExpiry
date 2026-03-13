from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import bcrypt

from app.models.user import User
from app.schemas.user import UserCreate

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
EXPIRE_MIN = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))


def hash_senha(senha: str) -> str:
    senha_bytes = senha.encode('utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(senha_bytes, salt).decode('utf-8')

def verificar_senha(senha: str, hash: str) -> bool:
    senha_bytes = senha.encode('utf-8')
    hash_bytes = hash.encode('utf-8')
    return bcrypt.checkpw(senha_bytes, hash_bytes)

def criar_token(dados: dict) -> str:
    payload = dados.copy()
    expiracao = datetime.utcnow() + timedelta(minutes=EXPIRE_MIN)
    payload.update({"exp": expiracao})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def registrar_usuario(db: Session, dados: UserCreate) -> User:
    existente = db.query(User).filter(User.email == dados.email).first()
    if existente:
        raise ValueError("Email já cadastrado")
    
    novo_usuario = User(
        name=dados.name,
        email=dados.email,
        password_hash=hash_senha(dados.password)
    )
    
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

def autenticar_usuario(db: Session, email: str, senha: str) -> User | None:
    usuario = db.query(User).filter(User.email == email).first()
    
    if not usuario:
        return None
    if not verificar_senha(senha, usuario.password_hash):
        return None
    
    return usuario