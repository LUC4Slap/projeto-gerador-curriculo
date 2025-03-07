import os
import pdfkit
from jinja2 import Environment, FileSystemLoader
from datetime import datetime

# Define o caminho do wkhtmltopdf dentro da pasta "htmlToPdfBin"
caminho_wkhtmltopdf = os.path.join("htmlToPdfBin", "wkhtmltopdf")
def formatar_data_pt_br(data_str):
    try:
        data_obj = datetime.strptime(data_str, "%Y-%m-%d")
        return data_obj.strftime("%d/%m/%Y")
    except (ValueError, TypeError):
        return data_str

def formatar_telefone_br(telefone_str):
    if not telefone_str:
        return telefone_str  # Retorna string vazia ou None sem formatar

    # Remove caracteres não numéricos
    numeros = ''.join(filter(str.isdigit, telefone_str))
    tamanho = len(numeros)

    if tamanho == 10:  # Formato com DDD e 8 dígitos (ex: 11 1234-5678)
        return f"({numeros[:2]}) {numeros[2:6]}-{numeros[6:]}"
    elif tamanho == 11: # Formato com DDD e 9 dígitos (ex: 11 91234-5678)
        return f"({numeros[:2]}) {numeros[2:7]}-{numeros[7:]}"
    else:
        return telefone_str
def gerar_curriculo(dados):
    env = Environment(loader=FileSystemLoader("templates"))
    env.filters['formatar_data_pt_br'] = formatar_data_pt_br
    env.filters['formatar_telefone_br'] = formatar_telefone_br
    template = env.get_template("curriculo.html")
    html = template.render(dados=dados)
    config = pdfkit.configuration(wkhtmltopdf=caminho_wkhtmltopdf)

    pdf_path = "/tmp/curriculo.pdf"  # Pasta temporária no Linux
    pdfkit.from_string(html, pdf_path, configuration=config)

    return pdf_path

