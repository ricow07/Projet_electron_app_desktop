const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// On définit l'emplacement du fichier .db
const dbPath = path.join(__dirname, 'labyrinthe.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Erreur base :", err.message);
    else console.log("✅ Fichier labyrinthe.db créé ou ouvert !");
});

db.serialize(() => {
    // Création de la table users
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user'
    )`);

    // Création de la table mazes
    db.run(`CREATE TABLE IF NOT EXISTS mazes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        difficulty INTEGER,
        grid_data TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

module.exports = db;