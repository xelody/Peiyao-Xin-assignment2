export default function getRandomGrid(r, c, probability = 0.05) {
    const grid = [];

    for (let i = 0; i < r; i++) {
        const row = [];
        for (let j = 0; j < c; j++) {
            const random = Math.random();
            const boxStatus = random <= probability ? true : false;
            row.push(boxStatus);
        }
        grid.push(row);
    }
    return grid;
}