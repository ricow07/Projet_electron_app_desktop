const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const SECRET_KEY = "asus_tuf_gaming_key"; // Clé pour sécuriser la session

const Auth = {
    // Créer un compte
    register: (username, password) => {
        return new Promise((resolve, reject) => {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
            
            db.run(query, [username, hashedPassword], function(err) {
                if (err) return reject("Ce nom d'utilisateur existe déjà.");
                resolve({ id: this.lastID, username });
            });
        });
    },

    // Se connecter
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE username = ?`;
            db.get(query, [username], (err, user) => {
                if (err || !user) return reject("Utilisateur non trouvé.");
                
                const valid = bcrypt.compareSync(password, user.password);
                if (!valid) return reject("Mot de passe incorrect.");
                
                // On crée un token (le badge d'accès)
                const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
                resolve({ token, user });
            });
        });
    }
};

module.exports = Auth;