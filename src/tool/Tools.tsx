import React from 'react';
import Button from '../button/Button';
import { getCurrentTool, setCurrentTool } from '../statemanager/StateManager';
import './Tools.css';

export enum ToolType {
    Rectangle = 0, Triangle = 1, Circle = 2, Text = 3
}

export default function Tools() {
    const currentTool = getCurrentTool();
    return (
        <div className="Tools-container">
            <Button text="Прямоугольник"
                class={currentTool === ToolType.Rectangle ? "Tools-selected" : "Tools-default"}
                onClick={() => setCurrentTool(ToolType.Rectangle)}></Button>
            <Button text="Треугольник"
                class={currentTool === ToolType.Triangle ? "Tools-selected" : "Tools-default"}
                onClick={() => setCurrentTool(ToolType.Triangle)}></Button>
            <Button text="Круг"
                class={currentTool === ToolType.Circle ? "Tools-selected" : "Tools-default"}
                onClick={() => setCurrentTool(ToolType.Circle)}></Button>
            <Button text="Текст"
                class={currentTool === ToolType.Text ? "Tools-selected" : "Tools-default"}
                onClick={() => setCurrentTool(ToolType.Text)}></Button>
        </div>
    );
}