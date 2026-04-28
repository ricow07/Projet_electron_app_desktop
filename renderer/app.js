const { ipcRenderer } = require('electron');

const authSection = document.getElementById('auth-section');
const gameSection = document.getElementById('game-section');
const status = document.getElementById('db-status');
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

let currentGrid = [];

// Gestion des inscriptions
document.getElementById('btn-register').addEventListener('click', async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (!user || !pass) return alert("Veuillez remplir tous les champs.");
    
    const result = await ipcRenderer.invoke('register', { username: user, password: pass });
    if (result.error) status.innerText = "Erreur : " + result.error;
    else status.innerText = "Inscription réussie. Vous pouvez vous connecter.";
});

// Gestion des connexions
document.getElementById('btn-login').addEventListener('click', async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    
    const result = await ipcRenderer.invoke('login', { username: user, password: pass });
    if (result.error) {
        status.innerText = "Erreur : " + result.error;
    } else {
        status.innerText = "Bienvenue " + user;
        authSection.style.display = 'none';
        gameSection.style.display = 'block';
        document.getElementById('main-card').style.width = '500px';
    }
});

// Fonction de dessin du labyrinthe, de l'entrée, de la sortie et du chemin
function drawMaze(grid, solution = []) {
    const size = grid.length;
    const cellSize = canvas.width / size;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessin des murs et des chemins
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            ctx.fillStyle = grid[y][x] === 1 ? "#00ffcc" : "#1a1a1a";
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    // Ajout de l'entrée en haut à gauche
    ctx.fillStyle = "#39ff14";
    ctx.fillRect(1 * cellSize, 1 * cellSize, cellSize, cellSize);

    // Ajout de la sortie en bas à droite
    ctx.fillStyle = "#ff003c";
    ctx.fillRect((size - 2) * cellSize, (size - 2) * cellSize, cellSize, cellSize);

    // Dessin de la solution si elle existe
    if (solution.length > 0) {
        ctx.fillStyle = "#ff4400";
        solution.forEach(cell => {
            ctx.fillRect(cell.x * cellSize + cellSize/4, cell.y * cellSize + cellSize/4, cellSize/2, cellSize/2);
        });
    }
}

// Événement pour générer un nouveau labyrinthe
document.getElementById('btn-generate').addEventListener('click', async () => {
    const size = parseInt(document.getElementById('maze-size').value);
    const grid = await ipcRenderer.invoke('generate-maze', size);
    currentGrid = grid;
    drawMaze(grid);
});

// Événement pour résoudre le labyrinthe actuel
document.getElementById('btn-solve').addEventListener('click', async () => {
    if (!currentGrid || currentGrid.length === 0) {
        alert("Générez d'abord un labyrinthe.");
        return;
    }
    const solution = await ipcRenderer.invoke('solve-maze', currentGrid);
    drawMaze(currentGrid, solution);
});