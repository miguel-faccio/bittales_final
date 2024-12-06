from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
import os
from back.models.users import UsuarioDB

# Configurações do JWT
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Função para criar o token JWT
# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# Função para autenticar e verificar o token JWT
# async def get_current_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="token"))):
#     credentials_exception = HTTPException(
#         status_code=401,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
#     return {"username": username}

# Configurações de templates e arquivos estáticos
templates = Jinja2Templates(directory=os.path.join(os.path.dirname(__file__), "../../front/pages"))

# Criando o router
router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# @router.post("/cadastro", response_class=HTMLResponse)
# async def register_user(request: Request):
#     form_data = await request.form()
#
#     nome = form_data.get("nome")
#     email = form_data.get("email")
#     senha = form_data.get("senha")
#     categoria_user = int(form_data.get("categoria_user", 1))  # Sempre 1
#
#
#     # Criptografar a senha
#     hashed_password = pwd_context.hash(senha)
#
#     # Inserir no banco de dados (certifique-se de que a lógica de inserção esteja correta)
#     new_user = UsuarioDB(
#         nome_usuario=nome,
#         email_usuario=email,
#         senha_usuario=hashed_password,
#         categoria_user=categoria_user
#     )
#
#     # Supondo que você tenha um método para adicionar um usuário
#     # Salvar o novo usuário no banco de dados
#     new_user.save()  # Altere isso para o método que você usa para salvar o usuário
#
#     return RedirectResponse(url="/", status_code=303)  # Redireciona após o cadastro

#
# @router.post("/token")
# async def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
#     user = UsuarioDB.get_or_none(UsuarioDB.email_usuario == form_data.username)
#     if user is None or not pwd_context.verify(form_data.password, user.senha_usuario):
#         # Retornar uma resposta com erro, que redirecionará para a página de login
#         return RedirectResponse(url="/", status_code=303)  # 303 See Other para o formulário de login
#
#     # Gerar o token JWT
#     access_token = create_access_token(data={"sub": form_data.username})
#
#     # Redirecionar para a view baseada na categoria do usuário
#     if user.categoria_user == 1:
#         return RedirectResponse(url="/menu", status_code=303)  # Redireciona para o menu
#     elif user.categoria_user == 3:
#         return RedirectResponse(url="/status", status_code=303)  # Redireciona para o status
#     else:
#         raise HTTPException(status_code=403, detail="Acesso não autorizado para esta categoria")


# @router.get("/", response_class=HTMLResponse)
# async def show_login_form(request: Request):
#     return templates.TemplateResponse("xadrez.html", {"request": request, "title": "Login"})
#
# @router.get("/dashboard", response_class=HTMLResponse)
# async def read_dashboard(request: Request, current_user: dict = Depends(get_current_user)):
#     if current_user is None:
#         return RedirectResponse(url="/", status_code=303)  # Redireciona para a página inicial
#     return templates.TemplateResponse("dashboard.html", {"request": request, "title": "Dashboard"})
@router.get("/", response_class=HTMLResponse)
async def read_menu(request: Request):
    return templates.TemplateResponse("main.html", {"request": request, "title": "Bit Tales"})
@router.get("/menu", response_class=HTMLResponse)
async def read_menu(request: Request):
    return templates.TemplateResponse("menu.html", {"request": request, "title": "Menu de Jogos"})
@router.get("/tales", response_class=HTMLResponse)
async def read_menu(request: Request):
    return templates.TemplateResponse("historia.html", {"request": request, "title": "Tales"})

# @router.get("/status", response_class=HTMLResponse)
# async def read_status(request: Request, current_user: dict = Depends(get_current_user)):  # Redireciona para a página inicial
#     return templates.TemplateResponse("status.html", {"request": request, "title": "Status"})
#
# @router.get("/cadastro", response_class=HTMLResponse)
# async def show_register_form(request: Request):
#     return templates.TemplateResponse("cadastro.html", {"request": request, "title": "Cadastro"})

@router.get("/dogrun", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/dogrun/dog.html", {"request": request, "title": "DogRun!"})

@router.get("/wladygame", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/vamp/vamp.html", {"request": request, "title": "W Lady Game!"})

@router.get("/xadrez", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/xadrez/CHESS/index.html", {"request": request, "title": "Xadrez!"})

@router.get("/velha", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/velha/velha.html", {"request": request, "title": "Jogo da Velha!"})

@router.get("/lovetest", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/love/love.html", {"request": request, "title": "Love Test!"})

@router.get("/water", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/water/water.html", {"request": request, "title": "Catch Water"})

@router.get("/pingpong", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/pingpong/ping.html", {"request": request, "title": "Pong Master!"})

@router.get("/pirata", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/pirata/pirata.html", {"request": request, "title": "Guerra Pirata!"})

@router.get("/tetris", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/tetris/tetris.html", {"request": request, "title": "Tetris!"})

@router.get("/sudoku", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/sudoku/sudoku.html", {"request": request, "title": "Sudoku!"})

@router.get("/colheita", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/colheita/maca.html", {"request": request, "title": "A Grande Colheita!"})

@router.get("/tesouro", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/caca/Caca.html", {"request": request, "title": "Caça ao Tesouro!"})

@router.get("/zodiac", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/damas/damas.html", {"request": request, "title": "ZodiacLady!"})
@router.get("/crazy", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/crazyrails/crazyrails.html", {"request": request, "title": "Crazy Rails!"})
@router.get("/stayin", response_class=HTMLResponse)
async def read_menu(request: Request):  # Redireciona para a página inicial
    return templates.TemplateResponse("jogos/stayIn/stayIn.html", {"request": request, "title": "Stay In!"})
