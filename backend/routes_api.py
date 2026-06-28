from flask import Blueprint, request, jsonify
from supabase import create_client, Client
import os
import json
from dotenv import load_dotenv

load_dotenv()

api_bp = Blueprint('api', __name__)

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

try:
    if url and key:
        supabase: Client = create_client(url, key)
    else:
        print("Supabase credentials missing.")
        supabase = None
except Exception as e:
    print(f"Supabase Init Error: {e}")
    supabase = None

@api_bp.route('/business-details', methods=['POST'])
def save_business_details():
    try:
        # Check Content-Type to decide how to parse
        if request.content_type.startswith('multipart/form-data'):
            # Handle mixed File/Data
            raw_data = request.form.to_dict()
            
            if 'json_data' in request.form:
                try:
                    data = json.loads(request.form['json_data'])
                except:
                    data = raw_data
            else:
                data = raw_data
            
            # Note: We are ignoring the file upload for AI analysis as requested.
            # valid_file = 'menu_file' in request.files
            
            # Clean up keys not in DB if necessary or just pass "data"
            # Removing form-specific keys if they exist in raw_data but not meant for DB
            if 'json_data' in data: del data['json_data']
            
        else:
            # Standard JSON
            data = request.json

        # Insert into DB
        if supabase:
            response = supabase.table('business_details').insert(data).execute()
            return jsonify({"message": "Details saved successfully", "data": response.data}), 201
        else:
            return jsonify({"message": "DB not connected, but data received."}), 200

    except Exception as e:
        print(f"Error saving business details: {e}")
        return jsonify({"error": str(e)}), 400

@api_bp.route('/business-details', methods=['GET'])
def get_business_details():
    try:
        if supabase:
            response = supabase.table('business_details').select("*").execute()
            return jsonify(response.data), 200
        return jsonify([]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_bp.route('/upload-survey', methods=['POST'])
def upload_survey():
    # AI Feature Disabled
    return jsonify({"message": "Survey upload disabled (AI Integration removed)."}), 200

@api_bp.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        
        if not user_message:
             return jsonify({"error": "Message is required"}), 400

        # Simple Echo / Placeholder
        ai_response = "AI Chat is currently disabled for deployment stability. (You said: " + user_message + ")"
        
        return jsonify({"response": ai_response}), 200
        
    except Exception as e:
        print(f"Chat Error: {e}")
        return jsonify({"error": str(e)}), 500

@api_bp.route('/chat/history', methods=['GET'])
def get_chat_history():
    return jsonify([]), 200
