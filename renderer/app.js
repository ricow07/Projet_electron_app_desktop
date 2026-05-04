const { ipcRenderer } = require('electron');

const welcomeSection = document.getElementById('welcome-section');
const authSection = document.getElementById('auth-section');
const gameSection = document.getElementById('game-section');
const victoryScreen = document.getElementById('victory-screen'); // Nouvel élément
const status = document.getElementById('db-status');
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

let currentGrid = [];
let playerPos = { x: 1, y: 1 };
let gameActive = false;

document.getElementById('btn-start').addEventListener('click', () => {
    welcomeSection.style.display = 'none';
    authSection.style.display = 'block';
});

document.getElementById('btn-register').addEventListener('click', async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (!user || !pass) return alert("Veuillez remplir tous les champs.");
    
    const result = await ipcRenderer.invoke('register', { username: user, password: pass });
    if (result.error) status.innerText = "Erreur : " + result.error;
    else status.innerText = "Inscription réussie. Vous pouvez vous connecter.";
});

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

function drawMaze(grid, solution = []) {
    const size = grid.length;
    const cellSize = canvas.width / size;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            ctx.fillStyle = grid[y][x] === 1 ? "#00ffcc" : "#1a1a1a";
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    ctx.fillStyle = "#39ff14";
    ctx.fillRect(1 * cellSize, 1 * cellSize, cellSize, cellSize);

    ctx.fillStyle = "#ff003c";
    ctx.fillRect((size - 2) * cellSize, (size - 2) * cellSize, cellSize, cellSize);

    if (solution.length > 0) {
        ctx.fillStyle = "#ff4400";
        solution.forEach(cell => {
            ctx.fillRect(cell.x * cellSize + cellSize/4, cell.y * cellSize + cellSize/4, cellSize/2, cellSize/2);
        });
    }

    if (grid.length > 0) {
        ctx.fillStyle = "#ffe600";
        ctx.beginPath();
        ctx.arc(playerPos.x * cellSize + cellSize / 2, playerPos.y * cellSize + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.getElementById('btn-generate').addEventListener('click', async () => {
    const size = parseInt(document.getElementById('maze-size').value);
    const grid = await ipcRenderer.invoke('generate-maze', size);
    currentGrid = grid;
    
    playerPos = { x: 1, y: 1 };
    gameActive = true;
    
    drawMaze(grid);
});

document.getElementById('btn-solve').addEventListener('click', async () => {
    if (!currentGrid || currentGrid.length === 0) {
        alert("Générez d'abord un labyrinthe.");
        return;
    }
    const solution = await ipcRenderer.invoke('solve-maze', currentGrid);
    drawMaze(currentGrid, solution);
    gameActive = false; 
});

// Écouteur pour le bouton "Rejouer" de l'écran de victoire
document.getElementById('btn-replay').addEventListener('click', () => {
    victoryScreen.style.display = 'none'; // Cache l'écran de victoire
    document.getElementById('btn-generate').click(); // Génère un nouveau labyrinthe automatiquement
});

document.addEventListener('keydown', (e) => {
    if (!gameActive || currentGrid.length === 0) return;

    let nx = playerPos.x;
    let ny = playerPos.y;

    if (e.key === 'ArrowUp' || e.key === 'z' || e.key === 'Z') ny--;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') ny++;
    if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'Q') nx--;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') nx++;

    if (currentGrid[ny] && currentGrid[ny][nx] === 0) {
        playerPos.x = nx;
        playerPos.y = ny;
        
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }

        drawMaze(currentGrid, []); 

        const size = currentGrid.length;
        if (playerPos.x === size - 2 && playerPos.y === size - 2) {
            gameActive = false;
            
            setTimeout(() => {
                victoryScreen.style.display = 'flex';
            }, 100);
        }
    }
});