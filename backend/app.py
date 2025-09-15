# File: backend/app.py

from flask import Flask
from routes import main
import os

def create_app():
    app = Flask(__name__,
                template_folder='../frontend/templates',
                static_folder='../frontend/static')

    app.secret_key = 'your_super_secret_key' # Add this line!

    app.register_blueprint(main)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)