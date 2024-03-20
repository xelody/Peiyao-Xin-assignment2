export default function getRandomGrid(r, c, probability = 0.10) {
    const grid = [];
    const heatGrid = [];

    for (let i = 0; i < r; i++) {
        const row = [];
        const heatRow = [];
        for (let j = 0; j < c; j++) {
            const random = Math.random();
            let boxStatus;
            if (random <= probability) {
                boxStatus = true;
                heatRow.push(-1);
            } else {
                boxStatus = false;
                heatRow.push(0);
            }
            row.push(boxStatus);
        }
        grid.push(row);
        heatGrid.push(heatRow)
    }
    return { randomGrid: grid, heatGrid: heatGrid };
}