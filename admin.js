const db = require('./database');

const Admin = {
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT id, username, role FROM users`;
            db.all(query, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
};

module.exports = Admin;