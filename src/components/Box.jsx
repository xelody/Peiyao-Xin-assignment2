import React, { useContext } from "react";
import '../styles/Box.css';
import { GridContext } from "./GridProvider";

export default function Box(props) {
    const [stateContext, updateGridSize, updateBox] = useContext(GridContext);
    const isAlive = stateContext.boxGrid[props.x][props.y];
    const isHeatMapMode = stateContext.isHeatMapMode;

    let className = "box";
    if (isAlive) {
        className += " alive";
    }

    if (isHeatMapMode) {
        const heatValue = stateContext.heatMapGrid[props.x][props.y];
        if(heatValue === 1) {
            className += " first";
        } else if (heatValue === 2) {
            className += " second";
        } else if (heatValue === 3) {
            className += " third";
        } else if (heatValue === 4) {
            className += " fourth";
        } else if (heatValue === 5) {
            className += " fifth";
        } else if (heatValue === 6) {
            className += " sixth";
        } else if (heatValue === 7) {
            className += " seventh";
        } else if (heatValue === 8) {
            className += " eighth";
        } else if (heatValue === 9) {
            className += " nineth";
        } else if (heatValue >= 10) {
            className += " ten-and-above";
        }

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
