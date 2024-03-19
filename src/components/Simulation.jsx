import React, { useState, useEffect, useContext } from 'react';
import Nav from './Nav';
import { GridContext } from './GridProvider';

import '../styles/simulation.css';
import '../styles/common.css';
import '../styles/Box.css';
import UpdateGridSize from './UpdateGridSize';
import initializeGrid from './InitializeBoxComponent';

const Simulation = () => {
    const [running, setRunning] = useState(false);

    const [gridState] = useContext(GridContext);

    let gridComponent = initializeGrid(gridState.rows, gridState.columns);

    const toggleSimulation = () => {
        setRunning(!running);
    };  

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
                <button onClick={toggleSimulation}>
                    {running ? 'Stop Simulation' : 'Start Simulation'}
                </button>
                <button onClick={initializeGrid}>Reset Grid</button>
            </div>
        </div>
    );
};

export default Simulation;
