import React, { createContext, useState } from 'react';
import getRandomGrid from './RandomGrid';

export const GridContext = createContext();

export function GridProvider(props) {
    const [rows, setRows] = useState(20);
    const [columns, setColumns] = useState(20);

    const { randomGrid, heatGrid } = getRandomGrid(rows, columns);

    const [count, setCount] = useState(countActiveBoxes(randomGrid));
    const [isHeatMapMode, setIsHeatMapMode] = useState(false);

    const [gridStateContext, setGridStateContext] = useState({
        activeBox: count,
        boxGrid: randomGrid,
        rows: rows,
        columns: columns,
        heatMapGrid: heatGrid,
        isHeatMapMode: isHeatMapMode,
    });

    const updateGridSize = (newRows, newColumns) => {
        setRows(newRows);
        setColumns(newColumns);
        const { newGrid, newHeatGrid } = getRandomGrid(newRows, newColumns);
        setGridStateContext({
            ...gridStateContext,
            boxGrid: newGrid,
            rows: newRows,
            columns: newColumns,
            activeBox: countActiveBoxes(newGrid),
            heatMapGrid: newHeatGrid,
        });
    };

    const updateBox = (newGrid, newHeatGrid) => {
        const newCount = countActiveBoxes(newGrid);
        setCount(newCount);

        setGridStateContext({
            ...gridStateContext,
            boxGrid: newGrid,
            activeBox: newCount,
            heatMapGrid: newHeatGrid,
        });
    };

    const toggleHeatMapMode = () => {
        setIsHeatMapMode(prevMode => !prevMode);
        setGridStateContext({
            ...gridStateContext,
            isHeatMapMode: isHeatMapMode,
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
        <GridContext.Provider value={[gridStateContext, updateGridSize, updateBox, toggleHeatMapMode, countActiveBoxes]}>
            {props.children}
        </GridContext.Provider>
    );
}