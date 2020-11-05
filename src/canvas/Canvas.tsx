import React, { useEffect, useState } from 'react';
import { drawObject } from '../helpers/DrawHelper';
import { getEditor, pushHistory, replaceSelectedObject, setEditor } from '../model/StateManager';
import { Polygon } from '../structures/Polygon';
import './Canvas.css';
import { Types } from '../structures/Type';
import { Vector2 } from '../structures/Vector2';
import { getFillColor, getStrokeColor } from '../colorpicker/ColorPicker';
import { ToolType } from '../tool/Tools';
import { Circle } from '../structures/Circle';
import { Art } from '../structures/Art';
import { TextObject } from '../structures/TextObject';
import { Editor } from '../structures/Editor';

interface CanvasProps {
    tool: ToolType
}

function Canvas({ tool }: CanvasProps) {
    const [isCanvasDown, setCanvasDown] = useState(false);
    const [tempObject, setTempObject] = useState<Polygon | Circle | TextObject | Art | null>(null);
    const [start, setStart] = useState<Vector2>({ x: 0, y: 0 });

    const editor = getEditor();
    useEffect(() => {
        renderCanvas(getEditor(), tempObject);
    }, [tempObject]);
    const onCreateObject = (moveEnd: Vector2) => {
        if (isCanvasDown) {
            let newObject = null;
            switch (tool) {
                case ToolType.Rectangle:
                    newObject = createRectangle(start, moveEnd);
                    break;
                case ToolType.Triangle:
                    newObject = createTriangle(start, moveEnd);
                    break;
                case ToolType.Circle:
                    newObject = createCircle(start, moveEnd);
                    break;
            }
            setTempObject(newObject);
        }
    }
    return (
        <div className="Canvas-container">
            <canvas id="canvas"
                className="Canvas"
                width={editor.canvas.width}
                height={editor.canvas.height}
                onMouseDown={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    if (canvas.style.cursor === "move") {
                        if (editor.selectedObject != null) {
                            setStart({
                                x: e.clientX - canvas.offsetLeft - editor.selectedObject.position.x,
                                y: e.clientY - canvas.offsetTop - editor.selectedObject.position.y
                            });
                        }
                    } else {
                        if (getEditor().selectedObject != null) {
                            setEditor(replaceSelectedObject(null));
                            pushHistory(getEditor().canvas);
                        }
                        setStart({
                            x: e.clientX - canvas.offsetLeft,
                            y: e.clientY - canvas.offsetTop
                        });
                    }
                    setCanvasDown(true);
                }}
                onMouseMove={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    const moveEnd: Vector2 = {
                        x: e.clientX - canvas.offsetLeft,
                        y: e.clientY - canvas.offsetTop
                    };
                    if (isCanvasDown) {
                        if (canvas.style.cursor === "move") {
                            const editor = getEditor();
                            if (editor.selectedObject != null) {
                                editor.selectedObject.position = {
                                    x: moveEnd.x - start.x,
                                    y: moveEnd.y - start.y
                                }
                                setEditor(editor);
                            }
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
                                && moveEnd.y <= normY + Math.abs(selectedObject.size.y)) {
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
                    if (tempObject != null) {
                        setEditor(replaceSelectedObject(tempObject));
                        setTempObject(null);
                    } else if (canvas.style.cursor === "default" && getEditor().selectedObject != null) {
                        setEditor(replaceSelectedObject(tempObject));
                        pushHistory(getEditor().canvas);
                    }
                    setCanvasDown(false);
                }}>
            </canvas>
        </div >
    );
}

export function renderCanvas(editor: Editor = getEditor(), tempCanvasObject: Polygon | Circle | TextObject | Art | null = null) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas == null) {
        return;
    }
    const context = canvas.getContext("2d");
    if (context != null) {
        context.putImageData(editor.canvas, 0, 0);
        if (editor.selectedObject != null) {
            context.putImageData(drawObject(context, { x: canvas.width, y: canvas.height }, editor.selectedObject), 0, 0);
            drawBorder(editor.selectedObject.position, editor.selectedObject.size, context);
        }
        if (tempCanvasObject != null) {
            context.putImageData(drawObject(context, { x: canvas.width, y: canvas.height }, tempCanvasObject), 0, 0);
        }
    }
}

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

function createCircle(downStart: Vector2, moveEnd: Vector2): Circle {
    const len = Math.sqrt(Math.pow(moveEnd.x - downStart.x, 2) + Math.pow(moveEnd.y - downStart.y, 2));
    return {
        type: Types.Circle,
        position: {
            x: downStart.x - len,
            y: downStart.y - len
        },
        size: {
            x: len * 2,
            y: len * 2
        },
        radius: len,
        fillColor: getFillColor(),
        strokeColor: getStrokeColor(),
        strokeWidth: 4
    }
}

