function generateClusterStarter(r, c) {
    const clusterGrid = [];
    const expectedClusters = Math.ceil(r * c * 0.011);
    let actualClusters = 0;
    let remainingGrid = r * c;

    for (let i = 0; i < r; i++) {
        const row = [];
        for (let j = 0; j < c; j++) {
            const random = Math.random();
            const probability = (expectedClusters - actualClusters) / remainingGrid;
            remainingGrid--;
            if (random > probability) {
                row.push(0);
                continue;
            }

            row.push(1);
            actualClusters += 1; 
        }
        clusterGrid.push(row);
    }
    return [clusterGrid, actualClusters];
}

const moves = [
    [-1, -1], [-1, 0], [-1, 1],  // Top row (diagonals)
    [0, -1],                 // Left
    [0, 1],                  // Right
    [1, -1], [1, 0], [1, 1],  // Bottom row (diagonals)
];
function generateCluster(r, c, i, j, grid, heatGrid, randomCellsNum, probability = 0.55) {
    if (randomCellsNum <= 0) return;

    if (!grid[i][j] && Math.random() < probability) {
        grid[i][j] = true;
        heatGrid[i][j] = -1;
        randomCellsNum--;
    }

    // Filter out moves that fall outside the grid boundaries
    const validMoves = moves.filter(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;
        return newI >= 0 && newI < r && newJ >= 0 && newJ < c;
    });

    const randomIndex = Math.floor(Math.random() * validMoves.length);
    const [x, y] = validMoves[randomIndex];
    return generateCluster(r, c, i + x, j + y, grid, heatGrid, randomCellsNum, probability);
}

export default function getRandomGrid(r, c) {
    const grid = [];
    const heatGrid = [];
    const [clusterGrid, numClusters] = generateClusterStarter(r, c);

    const maxCellsAllowed = Math.floor(r * c * 0.095); // Use max of 9.5% for allowed cells, 0.5% room of error 
    const minCellsNeeded = Math.ceil(r * c * 0.055); // Use min of 5.5% for allowed cells, 0.5% room of error
    const randomCellsNum = 
                Math.random() * (maxCellsAllowed - minCellsNeeded) + minCellsNeeded;

    // init empty grid
    for (let i = 0; i < r; i++) {
        const row = [];
        const heatRow = [];
        for (let j = 0; j < c; j++) {
            row.push(false);
            heatRow.push(-1);
        }
        grid.push(row);
        heatGrid.push(heatRow)
    }

    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (clusterGrid[i][j] == 0) {
                continue;
            }

            generateCluster(r, c, i, j, grid, heatGrid, Math.round(randomCellsNum/numClusters));
        }
    }
    return { randomGrid: grid, heatGrid: heatGrid };
}

