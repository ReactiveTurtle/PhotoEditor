import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import { render } from '../statemanager/StateManager';
import './Tools.css';

export enum ToolType {
    Rectangle = 0, Triangle = 1, Circle = 2, Text = 3
}

interface ToolsProps {
    onSelected(tool: ToolType): void
}

export default function Tools({ onSelected }: ToolsProps) {
    const [currentTool, setCurrentTool] = useState(ToolType.Rectangle);
    useEffect(() => {
        onSelected(currentTool);
    }, [onSelected, currentTool])
    const onClick = (tool: ToolType) => {
        setCurrentTool(tool);
        render();
    };
    return (
        <div className="Tools-container">
            <Button text="Прямоугольник"
                class={currentTool === ToolType.Rectangle ? "Tools-selected" : "Tools-default"}
                onClick={() => onClick(ToolType.Rectangle)}></Button>
            <Button text="Треугольник"
                class={currentTool === ToolType.Triangle ? "Tools-selected" : "Tools-default"}
                onClick={() => onClick(ToolType.Triangle)}></Button>
            <Button text="Круг"
                class={currentTool === ToolType.Circle ? "Tools-selected" : "Tools-default"}
                onClick={() => onClick(ToolType.Circle)}></Button>
            <Button text="Текст"
                class={currentTool === ToolType.Text ? "Tools-selected" : "Tools-default"}
                onClick={() => onClick(ToolType.Text)}></Button>
        </div>
    );
}