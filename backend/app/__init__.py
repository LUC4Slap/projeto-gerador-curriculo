from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000", "http://localhost:3000"])
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    from app.routes import main_bp  # Importa o Blueprint das rotas
    app.register_blueprint(main_bp)  # Registra o Blueprint no app

    return app