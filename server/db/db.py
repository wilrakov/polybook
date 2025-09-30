import sqlite3
import hmac
from typing import Optional

class AuthDB:
    def __init__(self, db_path: str = "polybook.db"):
        self.db_path = db_path
        # Pas de connexion globale : chaque opération ouvre/ferme sa connexion
        # pour éviter des soucis de concurrence et de cycle de vie.

    def _connect(self):
        return sqlite3.connect(self.db_path)

    def init_db(self):
        conn = self._connect()
        cur = conn.cursor()
        cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        conn.commit()
        conn.close()

    def add_user_with_hash(self, email: str, password_hash: str, name: str) -> bool:
        """
        Ajoute un utilisateur en stockant le hash tel quel.
        Retourne True si ok, False si le nom existe déjà.
        """
        conn = self._connect()
        cur = conn.cursor()
        try:
            cur.execute(
                "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
                (name, email, password_hash)
            )
            conn.commit()
            return True
        except sqlite3.IntegrityError:
            # conflit de clé UNIQUE (name déjà pris)
            return False
        finally:
            conn.close()

    def get_password_hash(self, email: str) -> Optional[str]:
        conn = self._connect()
        cur = conn.cursor()
        cur.execute("SELECT password_hash FROM users WHERE email = ?", (email,))
        row = cur.fetchone()
        conn.close()
        return row[0] if row else None

    def authenticate_with_hash(self, email: str, provided_hash: str) -> bool:
        """
        Compare le hash fourni par le client avec celui stocké.
        Utilise compare_digest pour éviter les attaques par timing.
        """
        stored = self.get_password_hash(email)
        if stored is None:
            return False
        # compare_digest nécessite des objets de même type (str ok)
        try:
            return hmac.compare_digest(stored, provided_hash)
        except Exception:
            return False

    def delete_user(self, email: str) -> bool:
        conn = self._connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM users WHERE email = ?", (email,))
        changed = cur.rowcount
        conn.commit()
        conn.close()
        return changed > 0

