# File: backend/routes.py

from flask import Blueprint, render_template, request

main = Blueprint('main', __name__)

@main.route('/')
def home():
    """Render homepage"""
    return render_template('index.html')


@main.route('/data-collections', methods=['GET', 'POST'])
def data_collections():
    """Render the data collections page"""
    if request.method == 'POST':
        # Later: handle form data
        pass
    return render_template('data_collections.html')


@main.route('/analysis')
def analysis():
    """Render analysis page"""
    return render_template('analysis.html')


# ----------------------------
# Static Authentication Pages
# ----------------------------

@main.route('/login')
def login():
    """Render login page"""
    return render_template('login.html')


@main.route('/signup')
def signup():
    """Render signup page"""
    return render_template('signup.html')

@main.route('/profile')
def profile():
    """Render user profile dashboard"""
    # user = session.get("user")
    return render_template('profile.html')
