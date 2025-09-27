from db.db import AuthDB
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import hashlib
import base64
import jwt
from datetime import datetime , timedelta

app = Flask(__name__)
db = AuthDB("polybook.db")
db.init_db()

# charge le .env et récupère le salt
load_dotenv()
SALT_STR = os.getenv("SALT", "1")  # récupère le salt depuis .env, valeur par défaut "1"
SALT_BYTES = SALT_STR.encode()       # convertit le salt en bytes pour le hash

@app.route("/register", methods=["POST"])
def register():
    """ 
    Attend un JSON du type :
    {
        "email": "alice",
        "password": "password provenant du client"
    }
    """
    data = request.get_json(force=True)
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        print("Erreur 1")
        return jsonify({"error": "Email et Password requis"}), 400

    # === HASH DU MOT DE PASSE ===
    # On combine le mot de passe fourni avec le salt fixe
    # Puis on calcule le hash SHA512 et on l'encode en base64
    t_sha = hashlib.sha512()
    t_sha.update(password.encode() + SALT_BYTES)
    hashed_password = base64.urlsafe_b64encode(t_sha.digest()).decode()

    # === AJOUT DE L'UTILISATEUR DANS LA DB ===
    # stocke l'email, le hash et le salt dans la DB
    success = db.add_user_with_hash(email, hashed_password)
    if not success:
        return jsonify({"error": "Nom déjà utilisé"}), 400

    return jsonify({"message": "Utilisateur créé"}), 201

@app.route("/login", methods=["POST"])
def check_email():
    data = request.get_json(force=True)
    email = data.get("email")
    password = data.get("password")
    SECRET_KEY = os.getenv("cle")
    token = jwt.encode(
    {"sub": email, "exp": datetime.utcnow() + timedelta(hours=1)},
    SECRET_KEY,
    algorithm="HS256"
)
    if not email:
        return jsonify({"error": "Email requis"}), 400

    # === HASH DU MOT DE PASSE POUR LE LOGIN ===
    # On hash le mot de passe fourni avec le même salt que pour l'inscription
    t_sha = hashlib.sha512()
    t_sha.update(password.encode() + SALT_BYTES)
    hashed_password = base64.urlsafe_b64encode(t_sha.digest()).decode()
    
    # === COMPARAISON AVEC LE HASH STOCKÉ ===
    # On vérifie si l'email et password correspondent
    # db.authentificate_with_hash(email: str, hashed_password: str)
    success = db.authenticate_with_hash(email, hashed_password)
    if success:
        return jsonify({"token": token , "user":{"email" : email}}), 200
    else:
        return jsonify({"error": "Mot de passe ou email incorrect"}), 401

if __name__ == "__main__":
    app.run(debug=True)

