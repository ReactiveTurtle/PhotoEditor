import React from 'react';
import { drawObject } from '../helpers/DrawHelper';
import { getCurrentTool, getEditor, render, replaceSelectedObject } from '../statemanager/StateManager';
import { Polygon } from '../structures/Polygon';
import './Canvas.css';
import { Types } from '../structures/Type';
import { getCanvasObject, getStart, isCanvasPressed, setCanvasPressed, setCanvasObject, setStart } from '../statemanager/TempData';
import { Vector2 } from '../structures/Vector2';
import { getFillColor, getStrokeColor } from '../colorpicker/ColorPicker';
import { ToolType } from '../tool/Tools';

function drawBorder(position: Vector2, size: Vector2, ctx: CanvasRenderingContext2D) {
    ctx.setLineDash([15, 20]);
    ctx.beginPath();
    ctx.lineWidth = 5;
    const normY = Math.min(position.y + size.y, position.y);
    ctx.moveTo(
        position.x - ctx.lineWidth,
        normY - ctx.lineWidth);
    ctx.lineTo(
        position.x + size.x + ctx.lineWidth,
        normY - ctx.lineWidth);
    ctx.lineTo(
        position.x + size.x + ctx.lineWidth,
        normY + Math.abs(size.y) + ctx.lineWidth);
    ctx.lineTo(
        position.x - ctx.lineWidth,
        normY + Math.abs(size.y) + ctx.lineWidth);
    ctx.lineTo(
        position.x - ctx.lineWidth,
        normY - ctx.lineWidth);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#888";
    ctx.stroke();
    ctx.setLineDash([]);
}

function Canvas() {
    const editor = getEditor();
    return (
        <div className="Canvas-container">
            <canvas ref={
                (c) => {
                    if (c == null) {
                        return;
                    }
                    const context = c.getContext("2d");
                    if (context != null) {
                        context.putImageData(editor.canvas, 0, 0);
                        if (editor.selectedObject != null) {
                            context.putImageData(drawObject(context, { x: c.width, y: c.height }, editor.selectedObject), 0, 0);
                            drawBorder(editor.selectedObject.position, editor.selectedObject.size, context);
                        }
                        const tempObject = getCanvasObject();
                        if (tempObject != null) {
                            context.putImageData(drawObject(context, { x: c.width, y: c.height }, tempObject), 0, 0);
                        }
                    }
                }}
                id="canvas"
                className="Canvas"
                width={editor.canvas.width}
                height={editor.canvas.height}
                onMouseDown={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    if (canvas.style.cursor === "move") {
                        if (editor.selectedObject != null) {
                            setStart(e.clientX - canvas.offsetLeft - editor.selectedObject.position.x,
                                e.clientY - canvas.offsetTop - editor.selectedObject.position.y);
                        }
                    } else {
                        replaceSelectedObject(null);
                        setStart(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                    }
                    setCanvasPressed(true);
                    return true;
                }}
                onMouseMove={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    const moveEnd: Vector2 = {
                        x: e.clientX - canvas.offsetLeft,
                        y: e.clientY - canvas.offsetTop
                    };
                    if (isCanvasPressed()) {
                        if (canvas.style.cursor === "move") {
                            if (editor.selectedObject != null) {
                                const start = getStart();
                                editor.selectedObject.position = {
                                    x: moveEnd.x - start.x,
                                    y: moveEnd.y - start.y
                                }
                            }
                            render();
                        } else {
                            onCreateObject(moveEnd);
                        }
                    } else {
                        const selectedObject = getEditor().selectedObject;
                        if (selectedObject != null) {
                            const normY = Math.min(selectedObject.position.y + selectedObject.size.y, selectedObject.position.y);
                            if (moveEnd.x >= selectedObject.position.x
                                && moveEnd.x <= selectedObject.position.x + selectedObject.size.x
                                && moveEnd.y >= normY
                                && moveEnd.y <=normY + Math.abs(selectedObject.size.y)) {
                                canvas.style.cursor = "move";
                            } else {
                                canvas.style.cursor = "default";
                            }
                        } else {
                            canvas.style.cursor = "default";
                        }
                    }
                }}
                onMouseUp={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    let tempObject = getCanvasObject();
                    if (tempObject != null) {
                        replaceSelectedObject(tempObject);
                        setCanvasObject(null);
                    } else if (canvas.style.cursor === "default") {
                        replaceSelectedObject(tempObject);
                    }
                    setCanvasPressed(false);
                    canvas.onmousedown = null;
                    canvas.onmousemove = null;
                    canvas.onmouseup = null;
                    render();
                }}>
            </canvas>
        </div >
    );
}

function onCreateObject(moveEnd: Vector2) {
    if (isCanvasPressed()) {
        const downStart: Vector2 = getStart();
        let newObject = null;
        const tool = getCurrentTool() as ToolType;
        switch (tool) {
            case ToolType.Rectangle:
                newObject = createRectangle(downStart, moveEnd);
                break;
            case ToolType.Triangle:
                newObject = createTriangle(downStart, moveEnd);
                break;
        }
        setCanvasObject(newObject);
        render();
        return true;
    }
    return false;
}

export default Canvas;

function createRectangle(downStart: Vector2, moveEnd: Vector2): Polygon {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: Math.min(downStart.y, moveEnd.y)
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: Math.max(downStart.y, moveEnd.y)
    };
    return {
        type: Types.Polygon,
        position: start,
        size: {
            x: end.x - start.x,
            y: end.y - start.y
        },
        points: [
            { x: 0, y: 0 },
            { x: end.x - start.x, y: 0 },
            { x: end.x - start.x, y: end.y - start.y },
            { x: 0, y: end.y - start.y }],
        fillColor: getFillColor(),
        strokeColor: getStrokeColor(),
        strokeWidth: 4
    }
}

function createTriangle(downStart: Vector2, moveEnd: Vector2): Polygon {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: downStart.y
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: moveEnd.y
    };
    return {
        type: Types.Polygon,
        position: start,
        size: {
            x: end.x - start.x,
            y: end.y - start.y
        },
        points: [
            { x: 0, y: 0 },
            { x: end.x - start.x, y: 0 },
            { x: (end.x - start.x) / 2, y: end.y - start.y }],
        fillColor: getFillColor(),
        strokeColor: getStrokeColor(),
        strokeWidth: 4
    }
}

