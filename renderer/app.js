const { ipcRenderer } = require('electron');

const authSection = document.getElementById('auth-section');
const gameSection = document.getElementById('game-section');
const status = document.getElementById('db-status');
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

let currentGrid = [];

// --- GESTION DES BOUTONS AUTH ---

document.getElementById('btn-register').addEventListener('click', async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (!user || !pass) return alert("Remplis tout !");
    
    const result = await ipcRenderer.invoke('register', { username: user, password: pass });
    if (result.error) status.innerText = "❌ " + result.error;
    else status.innerText = "✅ Inscrit ! Connecte-toi.";
});

document.getElementById('btn-login').addEventListener('click', async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    
    const result = await ipcRenderer.invoke('login', { username: user, password: pass });
    if (result.error) {
        status.innerText = "❌ " + result.error;
    } else {
        status.innerText = "👋 Salut " + user + " !";
        // BASCULE D'ECRAN
        authSection.style.display = 'none';
        gameSection.style.display = 'block';
        document.getElementById('main-card').style.width = '500px'; // On élargit pour le labyrinthe
    }
});

// --- GESTION DU LABYRINTHE ---

function drawMaze(grid) {
    const size = grid.length;
    const cellSize = canvas.width / size;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            ctx.fillStyle = grid[y][x] === 1 ? "#1a1a1a" : "#00ffcc";
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

document.getElementById('btn-generate').addEventListener('click', async () => {
    const size = parseInt(document.getElementById('maze-size').value);
    const grid = await ipcRenderer.invoke('generate-maze', size);
    currentGrid = grid;
    drawMaze(grid);
});