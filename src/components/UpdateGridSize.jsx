import React from "react";
import { useState, useContext } from "react";
import { GridContext } from "./GridProvider";
import "../styles/inputs.css"

const UpdateGridSize = () => {
    const [newHeight, setNewHeight] = useState('');
    const [newWidth, setNewWidth] = useState('');

    const [gridState, updateGridSize] = useContext(GridContext);

    const handleUpdateGridSize = () => {
        const height = parseInt(newHeight);
        const width = parseInt(newWidth);
        if (height >= 3 && height <= 40 && width >= 3 && width <= 40) {
            updateGridSize(height, width);
        } else {
            alert('Please enter height and width values between 3 and 40.');
        }
    };  

    return (<div className="input-fields">
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
    </div>)
}

export default UpdateGridSize;