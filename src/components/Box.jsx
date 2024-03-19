import React, { useContext } from "react";
import '../styles/Box.css';
import { GridContext } from "./GridProvider";

export default function Box(props) {
    const [stateContext, updateGridSize, updateBox] = useContext(GridContext);
    const isAlive = stateContext.boxGrid[props.x][props.y];

    let className = "box";
    if (isAlive) {
        className += " alive";
    }

    const toggleBoxState = () => {
        const newGrid = [...stateContext.boxGrid];
        newGrid[props.x][props.y] = !newGrid[props.x][props.y];
        updateBox(newGrid);
    };


    return (
        <div className={className} onClick={toggleBoxState}></div>
    );
};
