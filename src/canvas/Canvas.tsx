import React, { useEffect, useState } from 'react';
import { drawObject } from '../helper/DrawHelper';
import { dispatch, render } from '../statemanager/StateManager';
import { Point, Polygon } from '../structures/Polygon';
import './Canvas.css';
import { Types } from '../structures/Type';
import { Vector2 } from '../structures/Vector2';
import { getFillColor, getStrokeColor } from '../colorpicker/ColorPicker';
import { ToolType } from '../tool/Tools';
import { Art } from '../structures/Art';
import { TextObject } from '../structures/TextObject';
import { removeSelectedObject, replaceSelectedObject } from '../helper/EditorHelper';
import { length } from '../helper/VectorHelper';

interface CanvasProps {
    tool: ToolType,
    selectedObject: TextObject | Polygon | Art | null,
    imageData: ImageData,
}

export default function Canvas({ tool, selectedObject, imageData }: CanvasProps) {
    const [isCanvasDown, setCanvasDown] = useState(false);
    const [tempObject, setTempObject] = useState<Polygon | TextObject | Art | null>(null);
    const [start, setStart] = useState<Vector2>({ x: 0, y: 0 });
    const [resizeDirection, setResizeDirection] = useState<Vector2>({ x: 0, y: 0 });

    useEffect(() => {
        renderCanvas(imageData, selectedObject, tempObject);
    }, [imageData, selectedObject, tempObject]);
    const onCreateObject = (start: Vector2, moveEnd: Vector2) => {
        if (isCanvasDown) {
            let newObject = null;
            switch (tool) {
                case ToolType.Rectangle:
                    newObject = createRectangle(start, moveEnd);
                    break;
                case ToolType.Triangle:
                    break;
            }
            setTempObject(newObject);
        }
    }
    return (
        <div className="Canvas-container">
            <canvas id="canvas"
                className="Canvas"
                width={imageData.width}
                height={imageData.height}
                onMouseDown={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    if (canvas.style.cursor.endsWith("pointer")) {
                        if (selectedObject != null) {
                            dispatch(removeSelectedObject);
                            setTempObject(selectedObject);
                            setStart({
                                x: e.clientX - canvas.offsetLeft,
                                y: e.clientY - canvas.offsetTop
                            });
                        }
                    } else if (canvas.style.cursor === "move") {
                        if (selectedObject != null) {
                            setStart({
                                x: e.clientX - canvas.offsetLeft,
                                y: e.clientY - canvas.offsetTop
                            });
                        }
                    } else {
                        if (selectedObject != null) {
                            dispatch(replaceSelectedObject, null, true);
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
                            if (selectedObject != null) {
                                selectedObject.position = {
                                    x: selectedObject.position.x + moveEnd.x - start.x,
                                    y: selectedObject.position.y + moveEnd.y - start.y
                                }
                                setStart(moveEnd)
                                render();
                            }
                        } else {
                            onCreateObject(start, moveEnd);
                        }
                    } else {
                        setupCursor(canvas, moveEnd, selectedObject);
                    }
                }}
                onMouseUp={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    if (tempObject != null) {
                        dispatch(replaceSelectedObject, tempObject, false);
                        setTempObject(null);
                    } else if (canvas.style.cursor === "default" && selectedObject != null) {
                        dispatch(replaceSelectedObject, tempObject, false);
                    }
                    setCanvasDown(false);
                }}>
            </canvas>
        </div >
    );
}

function setupCursor(canvas: HTMLCanvasElement,
    moveEnd: Vector2,
    selectedObject: Polygon | TextObject | Art | null = null) {
    if (selectedObject != null) {
        let isFirstVisited = false;
        const polygon = selectedObject as Polygon;
        let point: Point | null = polygon.firstPoint;
        let isMovePoint = false;
        let isMovePolygon = false;
        while (!isMovePoint && !isMovePolygon && point != null && (!isFirstVisited || point != polygon.firstPoint)) {
            if (!isFirstVisited) {
                isFirstVisited = true;
            }
            isMovePoint = length({
                x: polygon.position.x + point.x - moveEnd.x,
                y: polygon.position.y + point.y - moveEnd.y
            }) <= 8;
            let mean: Vector2 | null = null;
            if (point.previous != null && point.next != null) {
                mean = {
                    x: point.previous.x / 2 + point.next.x / 2,
                    y: point.previous.y / 2 + point.next.y / 2
                }
                const dir = {
                    x: point.x - mean.x,
                    y: point.y - mean.y
                } as Vector2
                const dirLength = length(dir);
                const newLength = dirLength + 20;
                isMovePolygon = length({
                    x: moveEnd.x - (polygon.position.x + dir.x / dirLength * newLength + mean.x),
                    y: moveEnd.y - (polygon.position.y + dir.y / dirLength * newLength + mean.y)
                }) <= 8
            }
            point = point.next;
        }

        if (isMovePoint) {
            canvas.style.cursor = "pointer";
        } else if (isMovePolygon) {
            canvas.style.cursor = "move";
        } else {
            canvas.style.cursor = "default";
        }
    } else {
        canvas.style.cursor = "default";
    }
}

function renderCanvas(imageData: ImageData,
    selectedObject: Polygon | TextObject | Art | null = null,
    tempCanvasObject: Polygon | TextObject | Art | null = null) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas == null) {
        return;
    }
    const context = canvas.getContext("2d");
    if (context != null) {
        context.putImageData(imageData, 0, 0);
        if (selectedObject != null) {
            context.putImageData(drawObject(context, { x: imageData.width, y: imageData.height }, selectedObject), 0, 0);
            drawBorder(selectedObject as Polygon, context);
        }
        if (tempCanvasObject != null) {
            context.putImageData(drawObject(context, { x: imageData.width, y: imageData.height }, tempCanvasObject), 0, 0);
        }
    }
}

function drawBorder(polygon: Polygon, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    const radius = 8;

    let isFirstVisited = false;
    let point: Point | null = polygon.firstPoint;
    while (point != null && (!isFirstVisited || point != polygon.firstPoint)) {
        if (!isFirstVisited) {
            isFirstVisited = true;
        }
        ctx.moveTo(polygon.position.x + point.x, polygon.position.y + point.y);
        ctx.arc(polygon.position.x + point.x, polygon.position.y + point.y, radius, 0, Math.PI * 2);

        let mean: Vector2 | null = null;
        if (point.previous != null && point.next != null) {
            mean = {
                x: point.previous.x / 2 + point.next.x / 2,
                y: point.previous.y / 2 + point.next.y / 2
            }
            const dir = {
                x: point.x - mean.x,
                y: point.y - mean.y
            } as Vector2
            const dirLength = length(dir);
            const newLength = dirLength + 24;
            const movePoint = {
                x: polygon.position.x + dir.x / dirLength * newLength + mean.x,
                y: polygon.position.y + dir.y / dirLength * newLength + mean.y
            }
            ctx.moveTo(movePoint.x - 8, movePoint.y);
            ctx.lineTo(movePoint.x + 8, movePoint.y);
            ctx.moveTo(movePoint.x, movePoint.y - 8);
            ctx.lineTo(movePoint.x, movePoint.y + 8);
        }
        
        point = point.next;
    }
    ctx.closePath();
    ctx.fillStyle = "#64dd17";
    ctx.strokeStyle = "#64dd17";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
}

function createRectangle(downStart: Vector2, moveEnd: Vector2): Polygon {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: Math.min(downStart.y, moveEnd.y)
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: Math.max(downStart.y, moveEnd.y)
    };
    const points: Vector2[] = [
        { x: 0, y: 0 },
        { x: end.x - start.x, y: 0 },
        { x: end.x - start.x, y: end.y - start.y },
        { x: 0, y: end.y - start.y }]
    let firstPoint: Point | null = null;
    let point: Point | null = null;
    for (let i = 0; i < points.length; i++) {
        const item = points[i];
        const newPoint: Point = {
            x: item.x,
            y: item.y,
            radius: 0,
            previous: point,
            next: null
        }
        if (point !== null) {
            point.next = newPoint;
        }
        if (i === 0) {
            firstPoint = newPoint;
        }
        point = newPoint;
    }
    if (firstPoint != null && point != null) {
        firstPoint.previous = point;
        point.next = firstPoint;;
    }

    return {
        type: Types.Polygon,
        firstPoint: firstPoint,
        fillColor: getFillColor(),
        strokeColor: getStrokeColor(),
        strokeWidth: 4,
        position: start
    }
}
