from flask import Flask

def create_app():
    app = Flask(__name__)

    from app.routes import main_bp  # Importa o Blueprint das rotas
    app.register_blueprint(main_bp)  # Registra o Blueprint no app

    return app