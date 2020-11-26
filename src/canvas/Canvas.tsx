import React, { useEffect, useState } from 'react';
import { drawObject } from '../helper/DrawHelper';
import { dispatch } from '../statemanager/StateManager';
import './Canvas.css';
import { Types } from '../structures/Type';
import { Vector2 } from '../structures/Vector2';
import { getFillColor, getStrokeColor, getStrokeWidth, getText, getTextColor, getTextSize } from '../objectparams/ObjectParams';
import { ToolType } from '../components/tool/Tools';
import { Art } from '../structures/Art';
import { TextObject } from '../structures/TextObject';
import { cutSelectedArea, selectArea } from '../helper/CanvasHelper';
import { removeSelectedObject, replaceSelectedObject } from '../helper/EditorHelper';
import { length, cosinus } from '../helper/VectorHelper';
import { Rectangle } from '../structures/Rectangle';
import { Triangle } from '../structures/Triangle';
import { Circle } from '../structures/Circle';
import { SelectedArea } from '../structures/SelectedArea';

interface CanvasProps {
    tool: ToolType,
    selectedObject: TextObject | Rectangle | Triangle | Circle | Art | null,
    imageData: ImageData,
}

export default function Canvas({ tool, selectedObject, imageData }: CanvasProps) {
    const [isCanvasDown, setCanvasDown] = useState(false);
    const [tempObject, setTempObject] = useState<Rectangle | Triangle | Circle | TextObject | Art | SelectedArea | null>(null);
    const [tempPoint, setTempPoint] = useState<Vector2 | null>(null);
    const [start, setStart] = useState<Vector2>({ x: 0, y: 0 });

    useEffect(() => {
        renderCanvas(imageData, selectedObject, tempObject);
    }, [imageData, selectedObject, tempObject]);
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            console.log(e.code);
            if (e.ctrlKey) {
                if (e.code === "KeyX") {
                    if (tempObject != null && tempObject.type === Types.Area) {
                        dispatch(selectArea, tempObject);
                        dispatch(cutSelectedArea, undefined, true);
                        setTempObject(null);
                        dispatch(removeSelectedObject);
                    }
                }
            } else {
                switch (e.code) {
                    case "Escape":
                        setTempObject(null);
                        dispatch(replaceSelectedObject, null, true);
                        break;
                    case "Delete":
                        if (tempObject != null && tempObject.type === Types.Area) {
                            dispatch(selectArea, tempObject);
                            dispatch(removeSelectedObject, undefined, true);
                        } else {
                            dispatch(removeSelectedObject);
                        }
                        setTempObject(null);
                        break;
                    case "Enter":
                        if (tempObject != null && tempObject.type === Types.Area) {
                            dispatch(selectArea, tempObject, false);
                        } else {
                            dispatch(replaceSelectedObject, null, true);
                        }
                        setTempObject(null);
                        break;
                }
            }
        }
        window.addEventListener("keydown", listener)
        return () => {
            window.removeEventListener("keydown", listener)
        }
    })
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
                case ToolType.Text:
                    newObject = createText(start, moveEnd);
                    break;
                case ToolType.Area:
                    newObject = createArea(start, moveEnd);
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
                    if (canvas.style.cursor === "pointer") {
                        if (selectedObject != null) {
                            setTempObject(selectedObject);
                            dispatch(removeSelectedObject);
                            setStart({
                                x: e.clientX - canvas.offsetLeft,
                                y: e.clientY - canvas.offsetTop
                            });
                        }
                    } else if (canvas.style.cursor === "grab") {
                        if (selectedObject != null || (tempObject !== null && tempObject.type === Types.Area)) {
                            canvas.style.cursor = "grabbing";

                            if (selectedObject !== null || tempObject === null || tempObject.type !== Types.Area) {
                                setTempObject(selectedObject);
                            }
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
                        let deltaX = moveEnd.x - start.x;
                        let deltaY = moveEnd.y - start.y;
                        if (canvas.style.cursor === "pointer") {
                            if (tempObject !== null) {
                                if (tempPoint !== null) {
                                    if (tempObject.type === Types.Rectangle
                                        || tempObject.type === Types.TextObject
                                        || tempObject.type === Types.Art
                                        || tempObject.type === Types.Area) {
                                        let objRA: Rectangle | Art | SelectedArea;
                                        if (tempObject.type === Types.TextObject) {
                                            objRA = (tempObject as TextObject).rectangle;
                                        } else {
                                            objRA = tempObject as Rectangle | Art | SelectedArea;
                                        }
                                        if (e.shiftKey && objRA.type === Types.Art) {
                                            const delta: Vector2 = { x: deltaX, y: deltaY };

                                            const distance = length(delta);
                                            const sizeLength = length(objRA.size);
                                            const cos = objRA.size.x / sizeLength;
                                            const sin = objRA.size.y / sizeLength;
                                            deltaX = distance * cos;
                                            deltaY = distance * sin;
                                            const dir = Math.sign(cosinus(delta, tempPoint));
                                            objRA.position.x += deltaX * Math.min(tempPoint.x, 0) * dir;
                                            objRA.position.y += deltaY * Math.min(tempPoint.y, 0) * dir;
                                            objRA.size.x += deltaX * dir;
                                            objRA.size.y += deltaY * dir;
                                        } else {
                                            if (tempPoint.x > 0) {
                                                objRA.size.x += deltaX;
                                            } else if (tempPoint.x < 0) {
                                                objRA.position.x += deltaX;
                                                objRA.size.x += -deltaX;
                                            }
                                            if (tempPoint.y > 0) {
                                                objRA.size.y += deltaY;
                                            } else if (tempPoint.y < 0) {
                                                objRA.position.y += deltaY;
                                                objRA.size.y += -deltaY;
                                            }
                                        }
                                        if (objRA.size.x === 0) {
                                            objRA.size.x = -1;
                                        }
                                        if (objRA.size.y === 0) {
                                            objRA.size.y = -1;
                                        }
                                        if (objRA.size.x < 0) {
                                            tempPoint.x *= -1;
                                            objRA.size.x = Math.abs(objRA.size.x);
                                            objRA.position.x -= objRA.size.x;
                                        }
                                        if (objRA.size.y < 0) {
                                            tempPoint.y *= -1;
                                            objRA.size.y = Math.abs(objRA.size.y);
                                            objRA.position.y -= objRA.size.y;
                                        }
                                    } else if (tempObject.type === Types.Triangle) {
                                        tempPoint.x += deltaX;
                                        tempPoint.y += deltaY;
                                    } else if (tempObject.type === Types.Circle) {
                                        const circle = tempObject as Circle;
                                        circle.radius = length({
                                            x: moveEnd.x - circle.position.x,
                                            y: moveEnd.y - circle.position.y
                                        });
                                    }
                                }
                            }
                            setStart(moveEnd)
                            renderCanvas(imageData, null, tempObject);
                        } else if (canvas.style.cursor === "grabbing") {
                            if (tempObject != null) {
                                if (tempObject.type === Types.Rectangle
                                    || tempObject.type === Types.Circle
                                    || tempObject.type === Types.TextObject
                                    || tempObject.type === Types.Art
                                    || tempObject.type === Types.Area) {
                                    let objRCA: Rectangle | Circle | Art | SelectedArea;
                                    if (tempObject.type === Types.TextObject) {
                                        objRCA = (tempObject as TextObject).rectangle;
                                    } else {
                                        objRCA = tempObject as Rectangle | Circle | Art | SelectedArea;
                                    }
                                    objRCA.position.x += deltaX;
                                    objRCA.position.y += deltaY;
                                } else if (tempObject.type === Types.Triangle) {
                                    const triangle = tempObject as Triangle;
                                    triangle.p0.x += deltaX;
                                    triangle.p0.y += deltaY;
                                    triangle.p1.x += deltaX;
                                    triangle.p1.y += deltaY;
                                    triangle.p2.x += deltaX;
                                    triangle.p2.y += deltaY;
                                }
                            }
                            setStart(moveEnd)
                            renderCanvas(imageData, null, tempObject);
                        } else {
                            onCreateObject(start, moveEnd);
                        }
                    } else {
                        if (selectedObject === null && tempObject !== null && tempObject.type === Types.Area) {
                            setupCursor(canvas, moveEnd, tempObject, setTempPoint);
                        } else {
                            setupCursor(canvas, moveEnd, selectedObject, setTempPoint);
                        }
                        setStart(moveEnd)
                    }
                }}
                onMouseUp={(e) => {
                    const canvas = e.target as HTMLCanvasElement;
                    const moveEnd: Vector2 = {
                        x: e.clientX - canvas.offsetLeft,
                        y: e.clientY - canvas.offsetTop
                    };
                    if (tempObject != null) {
                        setupCursor(canvas, moveEnd, tempObject, setTempPoint);
                        if (tempObject.type !== Types.Area) {
                            dispatch(replaceSelectedObject, tempObject, false);
                            setTempObject(null);
                        } else if (canvas.style.cursor === "default") {
                            setTempObject(null);
                        }
                    } else if (canvas.style.cursor === "default" && selectedObject != null) {
                        dispatch(replaceSelectedObject, tempObject, true);
                    }
                    setCanvasDown(false);
                }}>
            </canvas>
        </div >
    );
}

function createRectangle(downStart: Vector2, moveEnd: Vector2): Rectangle {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: Math.min(downStart.y, moveEnd.y)
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: Math.max(downStart.y, moveEnd.y)
    };
    return {
        type: Types.Rectangle,
        position: start,
        size: {
            x: end.x - start.x,
            y: end.y - start.y
        },
        props: {
            fillColor: getFillColor(),
            strokeColor: getStrokeColor(),
            strokeWidth: getStrokeWidth()
        }
    }
}

function createTriangle(downStart: Vector2, moveEnd: Vector2): Triangle {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: downStart.y
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: moveEnd.y
    };
    return {
        type: Types.Triangle,
        p0: {
            x: start.x,
            y: start.y,
        },
        p1: {
            x: end.x,
            y: start.y,
        },
        p2: {
            x: start.x / 2 + end.x / 2,
            y: end.y,
        },
        props: {
            fillColor: getFillColor(),
            strokeColor: getStrokeColor(),
            strokeWidth: getStrokeWidth()
        }
    }
}

function createCircle(downStart: Vector2, moveEnd: Vector2): Circle {
    const len = Math.sqrt(Math.pow(moveEnd.x - downStart.x, 2) + Math.pow(moveEnd.y - downStart.y, 2));
    return {
        type: Types.Circle,
        position: {
            x: downStart.x,
            y: downStart.y
        },
        radius: len,
        props: {
            fillColor: getFillColor(),
            strokeColor: getStrokeColor(),
            strokeWidth: getStrokeWidth()
        }
    }
}

function createText(downStart: Vector2, moveEnd: Vector2): TextObject {
    return {
        type: Types.TextObject,
        rectangle: createRectangle(downStart, moveEnd),
        text: getText(),
        textSize: getTextSize(),
        textColor: getTextColor()
    }
}

function createArea(downStart: Vector2, moveEnd: Vector2): SelectedArea {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: Math.min(downStart.y, moveEnd.y)
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: Math.max(downStart.y, moveEnd.y)
    };
    return {
        type: Types.Area,
        position: start,
        size: {
            x: end.x - start.x,
            y: end.y - start.y
        },
    }
}

function setupCursor(canvas: HTMLCanvasElement,
    moveEnd: Vector2,
    selectedObject: Rectangle | Triangle | Circle | TextObject | Art | SelectedArea | null = null,
    setTempPoint: Function) {
    if (selectedObject != null) {
        if (selectedObject.type === Types.Rectangle
            || selectedObject.type === Types.TextObject
            || selectedObject.type === Types.Art
            || selectedObject.type === Types.Area) {
            let objRA: Rectangle | Art | SelectedArea;
            if (selectedObject.type === Types.TextObject) {
                objRA = (selectedObject as TextObject).rectangle;
            } else {
                objRA = selectedObject as Rectangle | Art | SelectedArea;
            }
            const position = objRA.position;
            let size: Vector2 = objRA.size;

            const points = [
                { x: position.x, y: position.y }, // Left Top
                { x: position.x + size.x / 2, y: position.y }, // Top
                { x: position.x + size.x, y: position.y }, // Top Right
                { x: position.x + size.x, y: position.y + size.y / 2 }, // Right
                { x: position.x + size.x, y: position.y + size.y }, // Bottom Right
                { x: position.x + size.x / 2, y: position.y + size.y }, // Bottom
                { x: position.x, y: position.y + size.y }, // Bottom Left
                { x: position.x, y: position.y + size.y / 2 } // Left
            ];
            const pointIndex = points
                .map((p) => length({ x: p.x - moveEnd.x, y: p.y - moveEnd.y }) <= 12)
                .findIndex((value) => value);
            if (pointIndex > -1) {
                setTempPoint({
                    x: Math.sign(points[pointIndex].x - (position.x + size.x / 2)),
                    y: Math.sign(points[pointIndex].y - (position.y + size.y / 2))
                });
                canvas.style.cursor = "pointer";
            } else if (moveEnd.x >= position.x
                && moveEnd.x <= position.x + size.x
                && moveEnd.y >= position.y
                && moveEnd.y <= position.y + size.y) {
                canvas.style.cursor = "grab";
            } else {
                canvas.style.cursor = "default";
            }
        } else if (selectedObject.type === Types.Triangle) {
            const triangle = selectedObject as Triangle;
            const points = [triangle.p0, triangle.p1, triangle.p2];
            const pointIndex = points
                .map((p) => length({ x: p.x - moveEnd.x, y: p.y - moveEnd.y }) <= 12)
                .findIndex((value) => value);
            if (pointIndex > -1) {
                setTempPoint(points[pointIndex]);
                canvas.style.cursor = "pointer";
            } else if (pointInTriangle(moveEnd, triangle.p0, triangle.p1, triangle.p2)) {
                canvas.style.cursor = "grab";
            } else {
                canvas.style.cursor = "default";
            }
        } else if (selectedObject.type === Types.Circle) {
            const circle = selectedObject as Circle;
            const distance = length({ x: moveEnd.x - circle.position.x, y: moveEnd.y - circle.position.y });
            if (distance >= circle.radius - 12 && distance <= circle.radius + 12) {
                canvas.style.cursor = "pointer";
            } else if (length({ x: moveEnd.x - circle.position.x, y: moveEnd.y - circle.position.y }) < Math.max(circle.radius - 12, 0)) {
                canvas.style.cursor = "grab";
            } else {
                canvas.style.cursor = "default";
            }
        }
    } else {
        canvas.style.cursor = "default";
    }
}

function pointInTriangle(p: Vector2, p0: Vector2, p1: Vector2, p2: Vector2) {
    var dX = p.x - p2.x;
    var dY = p.y - p2.y;
    var dX21 = p2.x - p1.x;
    var dY12 = p1.y - p2.y;
    var D = dY12 * (p0.x - p2.x) + dX21 * (p0.y - p2.y);
    var s = dY12 * dX + dX21 * dY;
    var t = (p2.y - p0.y) * dX + (p0.x - p2.x) * dY;
    if (D < 0) return s <= 0 && t <= 0 && s + t >= D;
    return s >= 0 && t >= 0 && s + t <= D;
}

function renderCanvas(imageData: ImageData,
    selectedObject: Rectangle | Triangle | Circle | TextObject | Art | null = null,
    tempCanvasObject: Rectangle | Triangle | Circle | TextObject | Art | SelectedArea | null = null) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas == null) {
        return;
    }
    const context = canvas.getContext("2d");
    if (context != null) {
        context.putImageData(imageData, 0, 0);
        if (selectedObject != null) {
            context.putImageData(drawObject(context, { x: imageData.width, y: imageData.height }, selectedObject), 0, 0);
            drawBorder(selectedObject, context);
        }
        if (tempCanvasObject != null) {
            if (tempCanvasObject.type !== Types.Area) {
                const objRTCTA = tempCanvasObject as Rectangle | Triangle | Circle | TextObject | Art;
                context.putImageData(drawObject(context, { x: imageData.width, y: imageData.height }, objRTCTA), 0, 0);
            } else {
                drawBorder(tempCanvasObject as SelectedArea, context);
            }
        }
    }
}

function createGradient(ctx: CanvasRenderingContext2D, position: Vector2, size: Vector2) {
    const grad = ctx.createLinearGradient(position.x, position.y, position.x + size.x, position.y + size.y);
    grad.addColorStop(0, "#F00");
    grad.addColorStop(0.2, "#FF0");
    grad.addColorStop(0.4, "#0F0");
    grad.addColorStop(0.6, "#0FF");
    grad.addColorStop(0.8, "#00F");
    grad.addColorStop(1, "#F0F");
    return grad;
}

function drawBorder(obj: Rectangle | Triangle | Circle | TextObject | Art | SelectedArea, ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 2;

    if (obj.type === Types.Rectangle
        || obj.type === Types.TextObject
        || obj.type === Types.Art
        || obj.type === Types.Area) {
        let objRA: Rectangle | Art | SelectedArea;
        if (obj.type === Types.TextObject) {
            objRA = (obj as TextObject).rectangle;
        } else {
            objRA = obj as Rectangle | Art | SelectedArea;
        }
        if (obj.type === Types.Area) {
            ctx.setLineDash([3, 4]);
        }
        let position = objRA.position;
        let size = objRA.size;
        ctx.beginPath();
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
        ctx.closePath();
        ctx.strokeStyle = createGradient(ctx, position, objRA.size);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.stroke();

        const radius = 8;

        const positions = [
            { x: position.x, y: position.y }, //Left Top
            { x: position.x + size.x / 2, y: position.y }, // Top
            { x: position.x + size.x, y: position.y }, // Right Top
            { x: position.x + size.x, y: position.y + size.y / 2 }, // Right
            { x: position.x + size.x, y: position.y + size.y }, // Right Bottom
            { x: position.x + size.x / 2, y: position.y + size.y }, // Bottom
            { x: position.x, y: position.y + size.y }, // Left Bottom
            { x: position.x, y: position.y + size.y / 2 }, // Left
        ];

        if (obj.type === Types.Area) {
            ctx.setLineDash([]);
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
            ctx.fill();
            ctx.strokeStyle = "#424242"
            ctx.stroke();
            ctx.closePath();
        });
    } else if (obj.type === Types.Triangle) {
        const triangle = obj as Triangle;
        ctx.beginPath();
        ctx.moveTo(triangle.p0.x, triangle.p0.y);
        ctx.lineTo(triangle.p1.x, triangle.p1.y);
        ctx.lineTo(triangle.p2.x, triangle.p2.y);
        ctx.closePath();


        const positions = [triangle.p0, triangle.p1, triangle.p2];

        const min = {
            x: Math.min(triangle.p0.x, triangle.p1.x, triangle.p2.x),
            y: Math.min(triangle.p0.y, triangle.p1.y, triangle.p2.y),
        }

        const max = {
            x: Math.max(triangle.p0.x, triangle.p1.x, triangle.p2.x),
            y: Math.max(triangle.p0.y, triangle.p1.y, triangle.p2.y),
        }
        ctx.strokeStyle = createGradient(ctx, min, {
            x: max.x - min.x,
            y: max.y - min.y
        });
        ctx.fillStyle = ctx.strokeStyle;
        ctx.stroke();

        const radius = 8;

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
            ctx.fill();
            ctx.strokeStyle = "#424242"
            ctx.stroke();
            ctx.closePath();
        });
    } else if (obj.type === Types.Circle) {
        const circle = obj as Circle;
        const position = circle.position;
        ctx.beginPath();
        ctx.moveTo(
            position.x + circle.radius + ctx.lineWidth,
            position.y);
        ctx.arc(position.x, position.y, circle.radius + ctx.lineWidth, 0, Math.PI * 2);
        ctx.closePath();
        ctx.strokeStyle = createGradient(ctx, {
            x: position.x - circle.radius,
            y: position.y - circle.radius
        }, {
            x: circle.radius * 2,
            y: circle.radius * 2
        });
        ctx.fillStyle = ctx.strokeStyle;
        ctx.stroke();
    }
}
