from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date

class ExperienciaDTO(BaseModel):
    nome_empresa: str
    data_inicio: str  # Alternativamente, pode ser `date`
    data_saida: Optional[str] = None  # Pode ser None caso o emprego ainda esteja ativo
    atual: bool
    competencias_vaga: List[str]
    atribuicoes: str
    cargo: str

class CurriculoDTO(BaseModel):
    nome: str
    telefone: str
    email: EmailStr
    estado_sivil: str
    experiencias: List[ExperienciaDTO]
    obejetivo: str
    meta: str
    competencias: List[str]
