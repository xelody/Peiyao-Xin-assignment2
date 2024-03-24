import React from 'react';

// Function to apply the rules and generate the next state of the grid
function applyRules(currentGrid, numRows, numCols, currentHeatGrid) {
    const nextGrid = [];
    const nextHeatGrid = [];

    // Function to count the number of live neighbors for a cell
    function countNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const neighborX = x + i;
                const neighborY = y + j;
                if (
                    neighborX >= 0 &&
                    neighborX < numRows &&
                    neighborY >= 0 &&
                    neighborY < numCols &&
                    !(i === 0 && j === 0)
                ) {
                    if (currentGrid[neighborX][neighborY]) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    for (let i = 0; i < numRows; i++) {
        const newRow = [];
        const newHeatRow = [];
        for (let j = 0; j < numCols; j++) {
            const neighbors = countNeighbors(i, j);
            const isAlive = currentGrid[i][j];

            if (isAlive && (neighbors < 2 || neighbors > 3)) {
                newRow.push(false); // Rule 1 and 3: box dies
                newHeatRow.push(1);
            } else if (!isAlive && neighbors === 3) {
                newRow.push(true); // Rule 4: Dead box becomes alive
                newHeatRow.push(-1);
            } else {
                newRow.push(isAlive); // Rule 2: Box lives
                
                if (!isAlive && currentHeatGrid[i][j] >= 0) {
                    newHeatRow.push(currentHeatGrid[i][j] + 1);
                } else {
                    newHeatRow.push(currentHeatGrid[i][j]);
                }
            }
        }
        nextGrid.push(newRow);
        nextHeatGrid.push(newHeatRow);
    }

    return { nextGrid: nextGrid, nextHeatGrid: nextHeatGrid };
}

const getNextGrid = ({boxGrid, rows, columns, heatGrid}) => {
    const { nextGrid, nextHeatGrid } = applyRules(boxGrid, rows, columns, heatGrid);
    return { newGrid: nextGrid, newHeatGrid: nextHeatGrid };
};

export default getNextGrid;
