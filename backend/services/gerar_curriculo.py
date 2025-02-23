import pdfkit
from jinja2 import Environment, FileSystemLoader

def gerar_curriculo(dados):
    env = Environment(loader=FileSystemLoader("templates"))
    template = env.get_template("curriculo.html")
    html = template.render(dados=dados)
    caminho_wkhtmltopdf = "/home/lucas/.asdf/shims/wkhtmltopdf"  # Atualize com o resultado do "which wkhtmltopdf"
    config = pdfkit.configuration(wkhtmltopdf=caminho_wkhtmltopdf)

    pdf_path = "/tmp/curriculo.pdf"  # Pasta temporária no Linux
    pdfkit.from_string(html, pdf_path, configuration=config)

    return pdf_path

