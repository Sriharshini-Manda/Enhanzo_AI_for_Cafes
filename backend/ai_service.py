import os
import pandas as pd
from llama_index.core import VectorStoreIndex, Document, Settings, StorageContext, load_index_from_storage
from llama_index.llms.gemini import Gemini
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.multi_modal_llms.gemini import GeminiMultiModal
from llama_index.core.schema import ImageNode
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configure Settings
if GOOGLE_API_KEY:
    # Using Gemini Flash (Latest) for Chat/Vision (API)
    # Using Local HuggingFace Embedding (Free/Unlimited) to avoid Quota issues
    Settings.llm = Gemini(model="models/gemini-flash-latest", system_prompt="You are an expert Cafe Recommendation System. You recommend cafes based on the survey data provided.", api_key=GOOGLE_API_KEY)
    Settings.embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")
    gemini_pro_vision = GeminiMultiModal(model="models/gemini-flash-latest", api_key=GOOGLE_API_KEY)
else:
    print("Warning: GOOGLE_API_KEY not found. AI features will not work.")

# Global Index
survey_index = None
STORAGE_DIR = "./storage"

def initialize_index():
    """Tries to load the index from disk, or builds it from default data."""
    global survey_index
    
    # 1. Try Loading from Disk (Persistence)
    if os.path.exists(STORAGE_DIR):
        print("Loading AI Knowledge Base from disk...")
        try:
            storage_context = StorageContext.from_defaults(persist_dir=STORAGE_DIR)
            survey_index = load_index_from_storage(storage_context)
            print("Successfully loaded Knowledge Base.")
            return
        except Exception as e:
            print(f"Error loading from disk: {e}. Rebuilding...")

    # 2. Rebuild from Excel if no valid storage
    default_path = os.path.join(os.path.dirname(__file__), 'data', 'Cafes Data Collection (Responses).xlsx')
    if os.path.exists(default_path):
        print(f"Found raw survey data at {default_path}. Building Knowledge Base...")
        ingest_survey_data(default_path)
    else:
        print("No default survey data found.")

def analyze_menu_image(image_path):
    """
    Analyzes a menu image and returns the text/data extracted.
    """
    if not GOOGLE_API_KEY:
        return "AI Service Unavailable"
        
    try:
        # Create an ImageNode
        image_node = ImageNode(image_path=image_path)
        
        # Use Gemini Vision to describe/extract
        response = gemini_pro_vision.complete(
            prompt="Extract all menu items, prices, and categories from this menu image. Return them as a structured text summary.",
            image_documents=[image_node]
        )
        return str(response)
    except Exception as e:
        print(f"Error analyzing menu: {e}")
        return f"Error analyzing menu: {e}"

def ingest_survey_data(file_path):
    """
    Ingests survey data from Excel/CSV, creates a vector index, and PERSISTS it to disk.
    """
    global survey_index
    if not GOOGLE_API_KEY:
        return "AI Service Unavailable"

    try:
        documents = []
        
        if file_path.endswith('.xlsx') or file_path.endswith('.xls'):
            df = pd.read_excel(file_path)
        elif file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        else:
            return "Unsupported file format"

        # Convert each row to a document with metadata
        for index, row in df.iterrows():
            # Create a rich text representation for semantic search
            row_text = f"Cafe/Business Survey Response #{index+1}:\n"
            for col in df.columns:
                val = row[col]
                if pd.notna(val) and val != "":
                    row_text += f"- {col}: {val}\n"
            
            # TODO: Add specific metadata (e.g. City, Cuisine) for filtering if known
            documents.append(Document(text=row_text))

        # Create Index
        print("Indexing documents...")
        survey_index = VectorStoreIndex.from_documents(documents)
        
        # Persist to Disk (The "Knowledge Base" storage)
        survey_index.storage_context.persist(persist_dir=STORAGE_DIR)
        print(f"Knowledge Base saved to {STORAGE_DIR}")
        
        return f"Successfully ingested {len(documents)} survey responses and saved Knowledge Base."
    except Exception as e:
        print(f"Error ingesting survey: {e}")
        return f"Error ingesting survey: {e}"

def chat_with_data(query, business_context=""):
    """
    Queries the combined knowledge base (Survey Data + Business Context).
    """
    if not GOOGLE_API_KEY:
        return "AI Service Unavailable"
        
    response_text = ""
    
    # 1. Query Survey Data if available
    if survey_index:
        # Use a query engine optimized for retrieval
        query_engine = survey_index.as_query_engine(similarity_top_k=5)
        survey_response = query_engine.query(query)
        response_text += f"\n**Relevant Survey Insights:**\n{survey_response}\n"
    
    # Final wrap to ensure polite conversation
    prompt = f"""
    You are an expert Cafe Consultant and Recommendation System.
    
    Your Goal: Analyze the user's query and provide strategic advice or recommendations based on the provided Survey Insights.
    
    User Context (Their Business):
    {business_context}
    
    {response_text}
    
    User Query: {query}
    
    Answer strategically. If the survey insights contain specific cafes or trends, cite them.
    If the user asks for recommendations, use the survey data to suggest best practices or similar successful cafes.
    """
    
    response = Settings.llm.complete(prompt)
    return str(response)

# Initialize on module load
initialize_index()
