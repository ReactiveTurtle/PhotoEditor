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
                    if (canvas.style.cursor.endsWith("-resize")) {
                        if (selectedObject != null) {
                            dispatch(removeSelectedObject);
                            setTempObject(selectedObject);
                            setStart({
                                x: e.clientX - canvas.offsetLeft,
                                y: e.clientY - canvas.offsetTop
                            });
                        }
                        switch (canvas.style.cursor.replace("-resize", "")) {
                            case "nw":
                                setResizeDirection({ x: -1, y: -1 })
                                break;
                            case "n":
                                setResizeDirection({ x: 0, y: -1 })
                                break;
                            case "ne":
                                setResizeDirection({ x: 1, y: -1 })
                                break;
                            case "e":
                                setResizeDirection({ x: 1, y: 0 })
                                break;
                            case "se":
                                setResizeDirection({ x: 1, y: 1 })
                                break;
                            case "s":
                                setResizeDirection({ x: 0, y: 1 })
                                break;
                            case "sw":
                                setResizeDirection({ x: -1, y: 1 })
                                break;
                            case "w":
                                setResizeDirection({ x: -1, y: 0 })
                                break;
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
                        if (canvas.style.cursor.endsWith("-resize")) {
                            if (tempObject != null) {
                                const border: Vector2 = {
                                    x: tempObject.position.x
                                        + -Math.min(resizeDirection.x, 0) * tempObject.size.x,
                                    y: tempObject.position.y
                                        + -Math.min(resizeDirection.y, 0) * tempObject.size.y
                                }
                                const isChangeDirX = (moveEnd.x - border.x) * resizeDirection.x < 0;
                                const isChangeDirY = (moveEnd.y - border.y) * resizeDirection.y < 0;
                                if (isChangeDirX) {
                                    start.x = border.x;
                                    tempObject.size.x = 0;
                                    resizeDirection.x *= -1;
                                }
                                if (isChangeDirY) {
                                    start.y = border.y;
                                    tempObject.size.y = 0;
                                    resizeDirection.y *= -1;
                                }
                                if (isChangeDirX || isChangeDirY) {
                                    canvas.style.cursor = getDirCursor(resizeDirection);
                                }
                                const xDelta = moveEnd.x - start.x;
                                const yDelta = moveEnd.y - start.y;
                                const newStartPosition = {
                                    x: tempObject.position.x
                                        + -Math.min(resizeDirection.x, 0) * xDelta,
                                    y: tempObject.position.y
                                        + -Math.min(resizeDirection.y, 0) * yDelta
                                }
                                const newEndPosition = {
                                    x: newStartPosition.x + tempObject.size.x
                                        + xDelta * resizeDirection.x,
                                    y: newStartPosition.y + tempObject.size.y
                                        + yDelta * resizeDirection.y
                                }

                                setStart(moveEnd)
                                onCreateObject(newStartPosition, newEndPosition);
                                render();
                            }
                        } else if (canvas.style.cursor === "move") {
                            if (selectedObject != null) {
                                selectedObject.position = {
                                    x: moveEnd.x - start.x,
                                    y: moveEnd.y - start.y
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
        const position = {
            x: Math.min(selectedObject.position.x + selectedObject.size.x, selectedObject.position.x),
            y: Math.min(selectedObject.position.y + selectedObject.size.y, selectedObject.position.y)
        };
        const size = {
            x: Math.abs(selectedObject.size.x),
            y: Math.abs(selectedObject.size.y)
        }

        const positions: Array<Vector2> = [
            { x: position.x, y: position.y }, //Left Top
            { x: position.x + size.x / 2, y: position.y }, // Top
            { x: position.x + size.x, y: position.y }, // Right Top
            { x: position.x + size.x, y: position.y + size.y / 2 }, // Right
            { x: position.x + size.x, y: position.y + size.y }, // Right Bottom
            { x: position.x + size.x / 2, y: position.y + size.y }, // Bottom
            { x: position.x, y: position.y + size.y }, // Left Bottom
            { x: position.x, y: position.y + size.y / 2 }, // Left
        ];
        const resizes = positions.map((item) => {
            const dist = Math.sqrt(Math.pow(item.x - moveEnd.x, 2) +
                Math.pow(item.y - moveEnd.y, 2));
            return dist <= 8 + 4;
        });
        if (resizes.some(item => item)) {
            const pos = positions[resizes.findIndex(item => item)];
            const center: Vector2 = { x: position.x + size.x / 2, y: position.y + size.y / 2 };
            canvas.style.cursor = getDirCursor({ x: pos.x - center.x, y: pos.y - center.y });
        } else if (moveEnd.x >= selectedObject.position.x
            && moveEnd.x <= selectedObject.position.x + selectedObject.size.x
            && moveEnd.y >= position.y
            && moveEnd.y <= position.y + selectedObject.size.y) {
            canvas.style.cursor = "move";
        } else {
            canvas.style.cursor = "default";
        }
    } else {
        canvas.style.cursor = "default";
    }
}

function getDirCursor(dir: Vector2) {
    let x = "";
    if (dir.x > 0) {
        x = "e";
    } else if (dir.x < 0) {
        x = "w";
    }
    let y = "";
    if (dir.y > 0) {
        y = "s";
    } else if (dir.y < 0) {
        y = "n";
    }
    return y + x + "-resize";
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
    ctx.lineWidth = 2;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#64dd17";
    ctx.stroke();

    const radius = 8;

    let isFirstVisited = false;
    let point: Point | null = polygon.firstPoint;
    while (point != null && (!isFirstVisited || point != polygon.firstPoint)) {
    }
    positions.forEach((item) => {
        ctx.beginPath();
        ctx.arc(
            item.x,
            item.y,
            radius,
            0,
            2 * Math.PI,
            false
        );
        ctx.fillStyle = "#64dd17";
        ctx.fill();
    });
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
