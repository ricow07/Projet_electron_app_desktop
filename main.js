const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Chargement des modules de la base de données, de l'authentification et du labyrinthe
require('./database.js');
const Auth = require('./auth.js'); 
const Labyrinth = require('./labyrinth.js');

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

// Logique de communication pour l'authentification
ipcMain.handle('register', async (event, { username, password }) => {
    try {
        return await Auth.register(username, password);
    } catch (error) {
        return { error: error.message || error };
    }
});

ipcMain.handle('login', async (event, { username, password }) => {
    try {
        return await Auth.login(username, password);
    } catch (error) {
        return { error: error.message || error };
    }
});

// Logique de communication pour la génération et la résolution du labyrinthe
ipcMain.handle('generate-maze', async (event, size) => {
    try {
        return Labyrinth.generate(size);
    } catch (error) {
        return { error: error.message };
    }
});

ipcMain.handle('solve-maze', async (event, grid) => {
    try {
        return Labyrinth.solve(grid);
    } catch (error) {
        return { error: error.message };
    }
});

// Gestion du cycle de vie de l'application
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});