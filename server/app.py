from db.db import AuthDB
from flask import Flask, request, jsonify
import hashlib
import base64
import uuid

app = Flask(__name__)
db = AuthDB("polybook.db")
db.init_db()

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

    salt = base64.urlsafe_b64encode(uuid.uuid4().bytes)
    t_sha = hashlib.sha512()
    t_sha.update(password.encode() + salt)
    hashed_password = base64.urlsafe_b64encode(t_sha.digest())

    success = db.add_user_with_hash(email, hashed_password.decode())
    #success = db.delete_user(email)
    if not success:
        return jsonify({"error": "Nom déjà utilisé"}), 400

    return jsonify({"message": "Utilisateur créé"}), 201

@app.route("/check_email", methods=["POST"])
def check_email():
    data = request.get_json(force=True)
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email requis"}), 400

    user = db.get_user(email)

    if user is None:
        print("Aucun compte trouvé pour cet email")
        return jsonify({"message": "Pas encore de compte"}), 404
    else:
        print("Email trouvé :", user)
        return jsonify({"message": "Email trouvé dans la base"}), 200

if __name__ == "__main__":
    app.run(debug=True)
