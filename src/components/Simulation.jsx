import React, { useState, useEffect } from 'react';
import Nav from './Nav'
import '../styles/simulation.css';
import '../styles/common.css';

const Simulation = () => {
    const [grid, setGrid] = useState([]);
    const [running, setRunning] = useState(false);
    const [newHeight, setNewHeight] = useState('');
    const [newWidth, setNewWidth] = useState('');
    const [updateSizeClicked, setUpdateSizeClicked] = useState(false);

    const initializeGrid = () => {
        const initialGrid = Array.from({ length: 20 }, () =>
          Array.from({ length: 20 }, () => 0)
        );
        setGrid(initialGrid);
    };

    const updateGrid = () => {
        // Implement logic to update the grid based on Game of Life rules
    };

    const toggleSimulation = () => {
        setRunning(!running);
    };

    const handleUpdateGridSize = () => {
        const height = parseInt(newHeight);
        const width = parseInt(newWidth);
        if (height >= 3 && height <= 40 && width >= 3 && width <= 40) {
            const newGrid = Array.from({ length: height }, () =>
                Array.from({ length: width }, () => 0)
            );
            setGrid(newGrid);
            setUpdateSizeClicked(true);
        } else {
            alert('Please enter height and width values between 3 and 40.');
        }
    };    

    useEffect(() => {
        initializeGrid();
      }, []);

    return (

        <div className="simulation">
            <Nav />
            <h1>Conway's Game of Life</h1>
            <div className="input-fields">
                <input
                    type="number"
                    value={newHeight}
                    onChange={(e) => setNewHeight(e.target.value)}
                    min="3"
                    max="40"
                    placeholder="Height"
                />
                <input
                    type="number"
                    value={newWidth}
                    onChange={(e) => setNewWidth(e.target.value)}
                    min="3"
                    max="40"
                    placeholder="Width"
                />
                <button onClick={handleUpdateGridSize}>Update Grid Size</button>
            </div>
            <div className="grid-container" style={{ gridTemplateColumns: `repeat(${newWidth || 20}, 20px)` }}>
                {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`cell ${cell === 1 ? 'alive' : 'dead'}`}
                    />
                    ))}
                </div>
                ))}
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
