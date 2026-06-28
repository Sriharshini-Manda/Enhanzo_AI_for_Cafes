from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from supabase import create_client, Client

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for all domains (simplify development)
    # In production, you might restrict this to your Vercel URL
    CORS(app)

    # Supabase Setup
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    
    if not url or not key:
        print("Warning: SUPABASE_URL or SUPABASE_KEY not found in .env")
        app.supabase = None
    else:
        app.supabase: Client = create_client(url, key)

    # Register API Routes
    from routes_api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    @app.route('/')
    def index():
        return {"message": "Flask API is running. Use /api/ endpoints to interact."}

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)