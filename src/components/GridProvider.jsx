import React, { createContext, useState } from 'react';
import getRandomGrid from './RandomGrid';

export const GridContext = createContext();

export function GridProvider(props) {
    const [rows, setRows] = useState(20);
    const [columns, setColumns] = useState(20);

    const randomGrid = getRandomGrid(rows, columns);

    const [count, setCount] = useState(countActiveBoxes(randomGrid));

    const [gridStateContext, setGridStateContext] = useState({
        activeBox: count,
        boxGrid: randomGrid,
        rows: rows,
        columns: columns,
    });

    const updateGridSize = (newRows, newColumns) => {
        setRows(newRows);
        setColumns(newColumns);
        const newGrid = getRandomGrid(newRows, newColumns);
        setGridStateContext({
            ...gridStateContext,
            boxGrid: newGrid,
            rows: newRows,
            columns: newColumns,
            activeBox: countActiveBoxes(newGrid),
        });
    };

    const updateBox = (newGrid) => {
        const newCount = countActiveBoxes(newGrid);
        setCount(newCount);

        setGridStateContext({
            ...gridStateContext,
            boxGrid: newGrid,
            activeBox: newCount,
        });
    };

    function countActiveBoxes(grid) {
        let activeCount = 0;
        for (let row of grid) {
            for (let box of row) {
                if (box) {
                    activeCount++;
                }
            }
        }
        return activeCount;
    };

    return (
        <GridContext.Provider value={[gridStateContext, updateGridSize, updateBox, countActiveBoxes]}>
            {props.children}
        </GridContext.Provider>
    );
}