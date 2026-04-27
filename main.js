const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// --- CHARGEMENT DES MODULES ---
require('./database.js');
const Auth = require('./auth.js'); 
const Labyrinth = require('./labyrinth.js'); // <--- AJOUTE CETTE LIGNE

function createWindow() {
    const win = new BrowserWindow({
        width: 1100,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

// --- LOGIQUE DE COMMUNICATION (IPC) ---

// Auth
ipcMain.handle('register', async (event, { username, password }) => {
    try { return await Auth.register(username, password); } 
    catch (error) { return { error: error.message || error }; }
});

ipcMain.handle('login', async (event, { username, password }) => {
    try { return await Auth.login(username, password); } 
    catch (error) { return { error: error.message || error }; }
});

// Labyrinthe <--- AJOUTE CE BLOC
ipcMain.handle('generate-maze', async (event, size) => {
    try {
        return Labyrinth.generate(size);
    } catch (error) {
        return { error: error.message };
    }
});

// --- CYCLE DE VIE ---
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});