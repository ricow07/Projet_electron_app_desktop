const Labyrinth = {
    // Algorithme de génération par backtracking récursif (inchangé)
    generate: (size) => {
        if (size % 2 === 0) size++; 
        let grid = Array(size).fill().map(() => Array(size).fill(1));

        function carve(x, y) {
            grid[y][x] = 0;
            const dirs = [[0, 2], [0, -2], [2, 0], [-2, 0]].sort(() => Math.random() - 0.5);

            for (let [dx, dy] of dirs) {
                let nx = x + dx, ny = y + dy;
                if (ny >= 1 && ny < size && nx >= 1 && nx < size && grid[ny][nx] === 1) {
                    grid[y + dy / 2][x + dx / 2] = 0;
                    carve(nx, ny);
                }
            }
        }

        carve(1, 1);
        return grid;
    },

    // Algorithme de résolution utilisant une recherche en largeur (BFS)
    // --- C'EST ICI QUE LA CORRECTION A ÉTÉ APPORTÉE ---
    solve: (grid) => {
        const size = grid.length;
        const start = { x: 1, y: 1 };
        const end = { x: size - 2, y: size - 2 };
        const queue = [[start]];
        const visited = new Set(['1,1']);

        while (queue.length > 0) {
            const path = queue.shift();
            const { x, y } = path[path.length - 1];

            if (x === end.x && y === end.y) return path;

            const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            for (let [dx, dy] of neighbors) {
                const nx = x + dx, ny = y + dy;
                // La ligne suivante a été modifiée pour vérifier que la case 
                // n'est pas un mur (sa valeur doit être 0 pour un chemin)
                if (
                    ny >= 0 && ny < size &&
                    nx >= 0 && nx < size &&
                    grid[ny][nx] === 0 && // <--- AJOUTE CETTE VÉRIFICATION
                    !visited.has(`${nx},${ny}`)
                ) {
                    visited.add(`${nx},${ny}`);
                    queue.push([...path, { x: nx, y: ny }]);
                }
            }
        }
        return [];
    }
};

module.exports = Labyrinth;