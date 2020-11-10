import React, { useEffect, useState } from 'react';
import { drawObject } from '../helper/DrawHelper';
import { dispatch } from '../statemanager/StateManager';
import { Point, Polygon } from '../structures/Polygon';
import './Canvas.css';
import { Types } from '../structures/Type';
import { Vector2 } from '../structures/Vector2';
import { getFillColor, getStrokeColor, getStrokeWidth } from '../objectparams/ObjectParams';
import { ToolType } from '../components/tool/Tools';
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
    const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
    const [start, setStart] = useState<Vector2>({ x: 0, y: 0 });

    useEffect(() => {
        renderCanvas(imageData, selectedObject, tempObject);
    }, [imageData, selectedObject, tempObject]);
    const onCreateObject = (start: Vector2, moveEnd: Vector2) => {
        if (isCanvasDown) {
            let newObject = null;
            console.log(tool)
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
                width={imageData.width}
                height={imageData.height}
                onMouseDown={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    if (canvas.style.cursor === "grab") {
                        if (selectedObject != null) {
                            setTempObject(selectedObject);

                            let isFirstVisited = false;
                            const polygon = selectedObject as Polygon;
                            let point: Point | null = polygon.firstPoint;
                            let mean: Vector2 | null = null;
                            while (point != null && selectedPoint === null && (!isFirstVisited || point !== polygon.firstPoint)) {
                                if (!isFirstVisited) {
                                    isFirstVisited = true;
                                }
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
                                    const radiusLength = Math.max(dirLength - 32, 0);
                                    if (length({
                                        x: polygon.position.x + dir.x / dirLength * radiusLength + mean.x - start.x,
                                        y: polygon.position.y + dir.y / dirLength * radiusLength + mean.y - start.y
                                    }) <= 12) {
                                        setSelectedPoint(point);
                                        break;
                                    } else {
                                        setSelectedPoint(null)
                                    }
                                }
                                point = point.next;
                            }
                            dispatch(removeSelectedObject);
                            setStart({
                                x: e.clientX - canvas.offsetLeft,
                                y: e.clientY - canvas.offsetTop
                            });
                        }
                    } else if (canvas.style.cursor === "pointer") {
                        if (selectedObject != null) {
                            setTempObject(selectedObject);

                            let isFirstVisited = false;
                            const polygon = selectedObject as Polygon;
                            let point: Point | null = polygon.firstPoint;
                            while (point != null && selectedPoint === null && (!isFirstVisited || point !== polygon.firstPoint)) {
                                if (!isFirstVisited) {
                                    isFirstVisited = true;
                                }
                                if (length({
                                    x: polygon.position.x + point.x - start.x,
                                    y: polygon.position.y + point.y - start.y
                                }) <= 12) {
                                    setSelectedPoint(point);
                                    break;
                                } else {
                                    setSelectedPoint(null)
                                }
                                point = point.next;
                            }
                            dispatch(removeSelectedObject);
                            setStart({
                                x: e.clientX - canvas.offsetLeft,
                                y: e.clientY - canvas.offsetTop
                            });
                        }
                    } else if (canvas.style.cursor === "move") {
                        if (selectedObject != null) {
                            setTempObject(selectedObject);
                            dispatch(removeSelectedObject);
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
                        if (canvas.style.cursor === "grab") {
                            if (selectedPoint != null) {
                                if (selectedPoint.previous != null && selectedPoint.next != null) {
                                    const point: Vector2 = {
                                        x: selectedPoint.parent.position.x + selectedPoint.x,
                                        y: selectedPoint.parent.position.y + selectedPoint.y
                                    }
                                    const pointPrev: Vector2 = {
                                        x: point.x / 2 + (selectedPoint.parent.position.x + selectedPoint.previous.x) / 2,
                                        y: point.y / 2 + (selectedPoint.parent.position.y + selectedPoint.previous.y) / 2
                                    }
                                    const pointNext: Vector2 = {
                                        x: point.x / 2 + (selectedPoint.parent.position.x + selectedPoint.next.x) / 2,
                                        y: point.y / 2 + (selectedPoint.parent.position.y + selectedPoint.next.y) / 2
                                    }
                                    const dirPrev = {
                                        x: selectedPoint.x / 2 - selectedPoint.previous.x / 2,
                                        y: selectedPoint.y / 2 - selectedPoint.previous.y / 2
                                    }
                                    const dirNext = {
                                        x: selectedPoint.x / 2 - selectedPoint.next.x / 2,
                                        y: selectedPoint.y / 2 - selectedPoint.next.y / 2
                                    }
                                    let lenPrev = length(dirPrev);
                                    let lenNext = length(dirNext);

                                    let a = pointNext.x - pointPrev.x;
                                    let b = pointNext.y - pointPrev.y;

                                    const pointDist = (a === 0 ? 1 : (pointPrev.x - point.x) / a) - (b === 0 ? 1 : (pointPrev.y - point.y) / b);
                                    const cursorDist = (a === 0 ? 1 : (pointPrev.x - moveEnd.x) / a) - (b === 0 ? 1 : (pointPrev.y - moveEnd.y) / b);
                                    const radius = Math.max(1 - cursorDist * Math.sign(pointDist), 0) * Math.max(lenPrev, lenNext);
                                    selectedPoint.radius = Math.max(Math.min(radius, Math.max(lenPrev, lenNext)), 0);
                                }
                            }
                            setStart(moveEnd)
                            renderCanvas(imageData, null, tempObject);
                        } else if (canvas.style.cursor === "pointer") {
                            if (selectedPoint != null) {
                                const deltaX = moveEnd.x - start.x;
                                const deltaY = moveEnd.y - start.y;
                                selectedPoint.x += deltaX;
                                selectedPoint.y += deltaY;
                            }
                            setStart(moveEnd)
                            renderCanvas(imageData, null, tempObject);
                        } else if (canvas.style.cursor === "move") {
                            let polygon: Polygon | null = null;
                            if (tempObject != null) {
                                if (tempObject.type === Types.Polygon) {
                                    polygon = tempObject as Polygon;
                                } else if (tempObject.type === Types.Art) {
                                    polygon = (tempObject as Art).polygon;
                                }
                            }
                            if (polygon != null) {
                                if (polygon != null) {
                                    polygon.position = {
                                        x: polygon.position.x + moveEnd.x - start.x,
                                        y: polygon.position.y + moveEnd.y - start.y
                                    }
                                    setStart(moveEnd)
                                    renderCanvas(imageData, null, tempObject);
                                }
                            }
                        } else {
                            onCreateObject(start, moveEnd);
                        }
                    } else {
                        setupCursor(canvas, moveEnd, selectedObject);
                        setStart(moveEnd)
                    }
                }}
                onMouseUp={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    if (tempObject != null) {
                        dispatch(replaceSelectedObject, tempObject, false);
                        setTempObject(null);
                        setSelectedPoint(null);
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
    let polygon: Polygon | null = null;
    if (selectedObject != null) {
        if (selectedObject.type === Types.Polygon) {
            polygon = selectedObject as Polygon;
        } else if (selectedObject.type === Types.Art) {
            polygon = (selectedObject as Art).polygon;
        }
    }
    if (polygon != null) {
        let isFirstVisited = false;
        console.log("setup")

        let point: Point | null = polygon.firstPoint;
        let isMovePoint = false;
        let isMovePolygon = false;
        let isGrabRadius = false;
        if (point != null) {
            if (point.next === null && point.previous === null) {
                console.log("single point")
                isMovePolygon = length({
                    x: polygon.position.x + point.x - moveEnd.x,
                    y: polygon.position.y + point.y - moveEnd.y
                }) <= 12;
            } else {
                while (!isMovePoint && !isGrabRadius && !isMovePolygon && point !== null && (!isFirstVisited || point !== polygon.firstPoint)) {
                    if (!isFirstVisited) {
                        isFirstVisited = true;
                    }
                    isMovePoint = length({
                        x: polygon.position.x + point.x - moveEnd.x,
                        y: polygon.position.y + point.y - moveEnd.y
                    }) <= 12;
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
                        const moveLength = dirLength + 24;
                        isMovePolygon = length({
                            x: moveEnd.x - (polygon.position.x + dir.x / dirLength * moveLength + mean.x),
                            y: moveEnd.y - (polygon.position.y + dir.y / dirLength * moveLength + mean.y)
                        }) <= 12
                        const radiusLength = Math.max(dirLength - 32, 0);
                        isGrabRadius = length({
                            x: moveEnd.x - (polygon.position.x + dir.x / dirLength * radiusLength + mean.x),
                            y: moveEnd.y - (polygon.position.y + dir.y / dirLength * radiusLength + mean.y)
                        }) <= 12 && !polygon.control.lockChangeRadius
                    }
                    point = point.next;
                }
            }
        }

        if (isGrabRadius) {
            canvas.style.cursor = "grab";
        } else if (isMovePoint) {
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
            if (selectedObject.type === Types.Polygon) {
                drawBorder(selectedObject as Polygon, context);
            } else if (selectedObject.type === Types.Art) {
                drawBorder((selectedObject as Art).polygon, context);
            }
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
    if (point != null) {
        if (point.next === null && point.previous === null) {
            ctx.moveTo(polygon.position.x + point.x - 8, polygon.position.y + point.y);
            ctx.lineTo(polygon.position.x + point.x + 8, polygon.position.y + point.y);
            ctx.moveTo(polygon.position.x + point.x, polygon.position.y + point.y - 8);
            ctx.lineTo(polygon.position.x + point.x, polygon.position.y + point.y + 8);
        } else {
            while (point != null && (!isFirstVisited || point !== polygon.firstPoint)) {
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
                    const moveLength = dirLength + 24;
                    const movePoint = {
                        x: polygon.position.x + dir.x / dirLength * moveLength + mean.x,
                        y: polygon.position.y + dir.y / dirLength * moveLength + mean.y
                    }
                    ctx.moveTo(movePoint.x - 8, movePoint.y);
                    ctx.lineTo(movePoint.x + 8, movePoint.y);
                    ctx.moveTo(movePoint.x, movePoint.y - 8);
                    ctx.lineTo(movePoint.x, movePoint.y + 8);

                    const radiusLength = dirLength - 24;
                    const radiusPoint = {
                        x: polygon.position.x + dir.x / dirLength * radiusLength + mean.x,
                        y: polygon.position.y + dir.y / dirLength * radiusLength + mean.y
                    }
                    ctx.moveTo(radiusPoint.x, radiusPoint.y);
                    ctx.lineTo(radiusPoint.x - dir.x / dirLength * 8, radiusPoint.y - dir.y / dirLength * 8);
                }
                point = point.next;
            }
        }
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
    const polygon: Polygon = {
        type: Types.Polygon,
        control: {
            resizeAdjacentPoints: false,
            lockChangeRadius: false
        },
        firstPoint: null,
        fillColor: getFillColor(),
        strokeColor: getStrokeColor(),
        strokeWidth: getStrokeWidth(),
        position: start
    }
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
            parent: polygon,
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
        point.next = firstPoint;
    }
    polygon.firstPoint = firstPoint;

    return polygon;
}

function createTriangle(downStart: Vector2, moveEnd: Vector2): Polygon {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: Math.min(downStart.y, moveEnd.y)
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: Math.max(downStart.y, moveEnd.y)
    };
    const polygon: Polygon = {
        type: Types.Polygon,
        control: {
            resizeAdjacentPoints: false,
            lockChangeRadius: false
        },
        firstPoint: null,
        fillColor: getFillColor(),
        strokeColor: getStrokeColor(),
        strokeWidth: getStrokeWidth(),
        position: start
    }
    const points: Vector2[] = [
        { x: 0, y: 0 },
        { x: end.x - start.x, y: 0 },
        { x: end.x / 2 - start.x / 2, y: end.y / 2 - start.y / 2 }];
    let firstPoint: Point | null = null;
    let point: Point | null = null;
    for (let i = 0; i < points.length; i++) {
        const item = points[i];
        const newPoint: Point = {
            parent: polygon,
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
        point.next = firstPoint;
    }
    polygon.firstPoint = firstPoint;

    return polygon;
}

function createCircle(downStart: Vector2, moveEnd: Vector2): Polygon {
    const polygon: Polygon = {
        type: Types.Polygon,
        control: {
            resizeAdjacentPoints: false,
            lockChangeRadius: false
        },
        firstPoint: null,
        fillColor: getFillColor(),
        strokeColor: getStrokeColor(),
        strokeWidth: getStrokeWidth(),
        position: downStart
    }
    const radius1 = length({ x: moveEnd.x - downStart.x, y: moveEnd.y - downStart.y });
    const points: Vector2[] = [
        { x: -radius1, y: -radius1 },
        { x: radius1, y: -radius1 },
        { x: radius1, y: radius1 },
        { x: -radius1, y: radius1 }]
    let firstPoint: Point | null = null;
    let point: Point | null = null;
    for (let i = 0; i < points.length; i++) {
        const item = points[i];
        const newPoint: Point = {
            parent: polygon,
            x: item.x,
            y: item.y,
            radius: radius1,
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
        point.next = firstPoint;
    }
    polygon.firstPoint = firstPoint;

    return polygon;
}
