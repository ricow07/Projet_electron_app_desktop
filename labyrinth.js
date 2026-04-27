const Labyrinth = {
    generate: (size) => {
        // Toujours utiliser une taille impaire pour avoir des murs propres
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
    }
};

module.exports = Labyrinth;