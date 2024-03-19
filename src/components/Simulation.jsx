import React, { useState, useEffect, useContext } from 'react';
import Nav from './Nav';
import { GridContext } from './GridProvider';

import '../styles/simulation.css';
import '../styles/common.css';
import '../styles/Box.css';
import UpdateGridSize from './UpdateGridSize';
import initializeGrid from './InitializeBoxComponent';
import getNextGrid from './GetNextGrid';
import getRandomGrid from './RandomGrid';

const Simulation = () => {
    const [running, setRunning] = useState(false);

    const [gridState,updateGridSize, updateBox] = useContext(GridContext);

    let gridComponent = initializeGrid(gridState.rows, gridState.columns);

    const simulateOneStep = () => {
        const newGrid = getNextGrid({ boxGrid: gridState.boxGrid, rows: gridState.rows, columns: gridState.columns });
        updateBox(newGrid);
    }

    const resetGrid = () => {
        const newGrid = getRandomGrid(gridState.rows, gridState.columns);
        updateBox(newGrid);
    }


    return (

        <div className="simulation">
            <Nav />
            <h1>Conway's Game of Life</h1>
            <UpdateGridSize />
            <h3>Number of Active Boxes: {gridState.activeBox}</h3>
            <div className='grid-container'>
                {gridComponent}
            </div>
            <div className="controls">
                <button onClick={simulateOneStep}>
                    Next Step
                </button>
                <button onClick={resetGrid}>Reset Grid</button>
            </div>
        </div>
    );
};

export default Simulation;
