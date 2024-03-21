import React, { useState, useEffect, useContext, useRef } from 'react';
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
    const [step, setStep] = useState(0);
    const intervalRef = useRef(null);

    const [gridState, updateGridSize, updateBox, toggleHeatMapMode] = useContext(GridContext);
    let isHeatMapMode = gridState.isHeatMapMode;

    let gridComponent = initializeGrid(gridState.rows, gridState.columns);

    const simulateOneStep = () => {
        const {newGrid, newHeatGrid} = getNextGrid({ boxGrid: gridState.boxGrid, 
            rows: gridState.rows, columns: gridState.columns, 
            heatGrid: gridState.heatMapGrid});

        updateBox(newGrid, newHeatGrid);
        setStep(step + 1);
    }

    const resetGrid = () => {
        const { randomGrid, heatGrid } = getRandomGrid(gridState.rows, gridState.columns);
        updateBox(randomGrid, heatGrid);
    }

    const handleNextStep = () => {
        simulateOneStep();
    };

    const handleAutoplay = () => {
        setRunning(!running); 
    };

    useEffect(() => {
        intervalRef.current = setTimeout(() => {
            if (running) {
                simulateOneStep();
            }
            clearTimeout(intervalRef.current)
        }, 100);

        // Cleanup function to clear the timeout on component unmount
        return () => clearTimeout(intervalRef.current);
    }, [running, step]);

    return (
        <div className="simulation">
            <Nav />
            <h1>Conway's Game of Life</h1>
            <UpdateGridSize />
            <button id='heatMapButton' onClick={toggleHeatMapMode}>
                {isHeatMapMode ? 'Switch to Regular Mode' : 'Switch to Heatmap Mode'}
            </button>
            <h3>Number of Active Boxes: {gridState.activeBox}</h3>
            <div className='grid-container'>
                {gridComponent}
            </div>
            <div className="controls">
                <button onClick={handleNextStep}>
                    Next Step
                </button>
                <button onClick={handleAutoplay}>
                    {running ? 'Stop Autoplay' : 'Start Autoplay'}
                </button>
                <button onClick={resetGrid}>Reset Grid</button>
            </div>
        </div>
    );
};

export default Simulation;
