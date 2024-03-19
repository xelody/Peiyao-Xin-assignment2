import React from "react";
import Box from "./Box";
import '../styles/Box.css';

export default function initializeGrid(rows, cols) {
    const gridComponent = [];
    for (let i = 0; i < rows; i++) {
        const rowComponent = [];
        for (let j = 0; j < cols; j++) {
            rowComponent.push(<Box x={i} y={j}/>);
        }
        gridComponent.push(<div className='box-row'>{rowComponent}</div>);
    }
    return gridComponent;
}