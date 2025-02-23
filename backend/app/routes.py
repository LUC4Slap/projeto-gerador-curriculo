from flask import Blueprint, request, jsonify, send_file
import requests as req
from flask_pydantic import validate
from models.CurriculoDto import CurriculoDTO
from services.gerar_curriculo import gerar_curriculo

main_bp = Blueprint('main', __name__)  # Define um Blueprint

@main_bp.route("/gerar-curriculo", methods=['POST'])
@validate()
def infosCurriculo(body: CurriculoDTO):
    try:
        pdf_path = gerar_curriculo(body.dict())
        return send_file(pdf_path, as_attachment=True, mimetype="application/pdf", download_name="curriculo.pdf"), 200
    except Exception as ex:
        return jsonify({"error": f"Erro ao gerar o currículo: {ex}"}), 400