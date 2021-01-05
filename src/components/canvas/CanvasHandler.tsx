import { replaceSelectedObjectWithHistory } from "../../helper/EditorHelper";
import { createArea, createCircle, createRectangle, createText, createTriangle } from "../../helper/ObjectCreateHelper";
import { cosinus, length } from "../../helper/VectorHelper";
import actionReplaceSelectedObject from "../../store/actionCreators/actionReplaceSelectedObject";
import removeSelectedObject from "../../store/actionCreators/removeSelectedObject";
import updateCanvasViewModel from "../../store/actionCreators/updateCanvasViewModel";
import updateText from "../../store/actionCreators/updateText";
import { Art } from "../../structures/Art";
import { Circle } from "../../structures/Circle";
import { Editor } from "../../structures/Editor";
import { Rectangle } from "../../structures/Rectangle";
import { SelectedArea } from "../../structures/SelectedArea";
import { TextObject } from "../../structures/TextObject";
import { Triangle } from "../../structures/Triangle";
import { Types } from "../../structures/Type";
import { Vector2 } from "../../structures/Vector2";
import { CanvasViewModel } from "../../viewmodel/CanvasViewModel";
import { ViewModel } from "../../viewmodel/ViewModel";
import { ToolType } from "../tool/Tools";

export function onMouseDown(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    dispatch: Function,
    canvas: HTMLCanvasElement,
    editor: Editor,
    canvasViewModel: CanvasViewModel): void {
    const newCanvasViewModel = {
        ...canvasViewModel
    }
    if (canvasViewModel.isMiddleMouseDown) {
        return;
    }
    const selectedObject = editor.selectedObject;
    const tempObject = canvasViewModel.tempObject;
    if (canvas.style.cursor === "pointer") {
        if (selectedObject != null) {
            newCanvasViewModel.tempObject = selectedObject;
            const ctx = canvas.getContext("2d");
            if (ctx == null) {
                throw new Error("CanvasHandler: context is null");
            }
            if (selectedObject != null) {
                dispatch(removeSelectedObject());
            }
            newCanvasViewModel.start = {
                x: e.clientX - canvas.offsetLeft,
                y: e.clientY - canvas.offsetTop
            };
        }
    } else if (canvas.style.cursor === "grab") {
        if (selectedObject != null || (tempObject !== null && tempObject.type === Types.Area)) {
            canvas.style.cursor = "grabbing";

            if (selectedObject !== null || tempObject === null || tempObject.type !== Types.Area) {
                newCanvasViewModel.tempObject = selectedObject;
            }
            dispatch(removeSelectedObject());
            newCanvasViewModel.start = {
                x: e.clientX - canvas.offsetLeft,
                y: e.clientY - canvas.offsetTop
            };
        }
    } else {
        if (selectedObject != null) {
            replaceSelectedObjectWithHistory(dispatch, editor, null);
        }
        newCanvasViewModel.start = {
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop
        };
    }
    newCanvasViewModel.isCanvasDown = true;

    dispatch(updateCanvasViewModel(newCanvasViewModel));
}

export function onMouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    dispatch: Function,
    canvas: HTMLCanvasElement,
    viewModel: ViewModel): void {
    const canvasViewModel = viewModel.canvasModel;
    const newCanvasViewModel = {
        ...canvasViewModel
    }

    if (canvasViewModel.isMiddleMouseDown) {
        return;
    }
    const moveEnd: Vector2 = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    };

    const editor = viewModel.editor;
    const selectedObject = editor.selectedObject;
    const tempObject = canvasViewModel.tempObject;
    const scale = canvasViewModel.scale;
    if (canvasViewModel.isCanvasDown) {
        const tempPoint = canvasViewModel.tempPoint;
        const start = canvasViewModel.start;

        const onCreateObject = (start: Vector2, moveEnd: Vector2) => {
            if (canvasViewModel.isCanvasDown) {
                let newObject = null;
                const tool = viewModel.currentTool;
                const objectState = viewModel.objectState;
                switch (tool) {
                    case ToolType.Rectangle:
                        newObject = createRectangle(start, moveEnd, objectState);
                        break;
                    case ToolType.Triangle:
                        newObject = createTriangle(start, moveEnd, objectState);
                        break;
                    case ToolType.Circle:
                        newObject = createCircle(start, moveEnd, objectState);
                        break;
                    case ToolType.Text:
                        newObject = createText(start, moveEnd, objectState);
                        break;
                    case ToolType.Area:
                        newObject = createArea(start, moveEnd, objectState);
                        break;
                }
                newCanvasViewModel.tempObject = newObject;
                dispatch(updateCanvasViewModel(canvasViewModel));
            }
        }

        if (selectedObject != null) {
            replaceSelectedObjectWithHistory(dispatch, editor, null);
        }
        let deltaX = (moveEnd.x - start.x) / scale;
        let deltaY = (moveEnd.y - start.y) / scale;
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
            newCanvasViewModel.start = moveEnd;
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
            newCanvasViewModel.start = moveEnd;
        } else {
            if (canvas.style.cursor === "default") {
                if (viewModel.objectState.text !== "") {
                    dispatch(updateText(""));
                }
            }
            onCreateObject({ x: start.x / scale, y: start.y / scale },
                { x: moveEnd.x / scale, y: moveEnd.y / scale });
        }
    } else {
        const setTempPoint = (point: Vector2) => {
            newCanvasViewModel.tempPoint = point;
        }
        if (selectedObject === null && tempObject !== null && tempObject.type === Types.Area) {
            setupCursor(canvas, scale, moveEnd, tempObject, setTempPoint);
        } else {
            setupCursor(canvas, scale, moveEnd, selectedObject, setTempPoint);
        }
        newCanvasViewModel.start = moveEnd;
    }
    dispatch(updateCanvasViewModel(newCanvasViewModel));
}

export function onMouseUp(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    dispatch: Function,
    canvas: HTMLCanvasElement,
    viewModel: ViewModel) {
    const moveEnd: Vector2 = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    };
    const canvasViewModel = viewModel.canvasModel;
    const newCanvasViewModel = {
        ...canvasViewModel
    }
    const editor = viewModel.editor;
    const selectedObject = editor.selectedObject;
    const tempObject = canvasViewModel.tempObject;
    const scale = canvasViewModel.scale;

    const setTempPoint = (point: Vector2) => {
        newCanvasViewModel.tempPoint = point;
    }

    if (tempObject != null) {
        setupCursor(canvas, scale, moveEnd, tempObject, setTempPoint);
        if (tempObject.type !== Types.Area) {
            dispatch(actionReplaceSelectedObject(tempObject as TextObject | Rectangle | Triangle | Circle | Art));
            newCanvasViewModel.tempObject = null;
        } else if (canvas.style.cursor === "default") {
            newCanvasViewModel.tempObject = null;
        }
    } else if (canvas.style.cursor === "default") {
        if (selectedObject != null) {
            replaceSelectedObjectWithHistory(dispatch, editor, null, editor.canvas);
        } else {
            dispatch(updateText(""));
        }
    }
    newCanvasViewModel.isCanvasDown = false;
    dispatch(updateCanvasViewModel(newCanvasViewModel));
}


function setupCursor(canvas: HTMLCanvasElement,
    scale: number,
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
            const position = {
                x: objRA.position.x * scale,
                y: objRA.position.y * scale,
            };
            let size: Vector2 = {
                x: objRA.size.x * scale,
                y: objRA.size.y * scale,
            };

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
            const scaledPoints = [
                { x: triangle.p0.x * scale, y: triangle.p0.y * scale },
                { x: triangle.p1.x * scale, y: triangle.p1.y * scale },
                { x: triangle.p2.x * scale, y: triangle.p2.y * scale }];
            const pointIndex = scaledPoints
                .map((p) => length({ x: p.x - moveEnd.x, y: p.y - moveEnd.y }) <= 12)
                .findIndex((value) => value);
            if (pointIndex > -1) {
                setTempPoint(points[pointIndex]);
                canvas.style.cursor = "pointer";
            } else if (pointInTriangle(moveEnd, scaledPoints[0], scaledPoints[1], scaledPoints[2])) {
                canvas.style.cursor = "grab";
            } else {
                canvas.style.cursor = "default";
            }
        } else if (selectedObject.type === Types.Circle) {
            const circle = selectedObject as Circle;
            const position = {
                x: circle.position.x * scale,
                y: circle.position.y * scale,
            };
            const radius = circle.radius * scale;
            const distance = length({ x: moveEnd.x - position.x, y: moveEnd.y - position.y });
            if (distance >= radius - 12 && distance <= radius + 12) {
                canvas.style.cursor = "pointer";
            } else if (length({ x: moveEnd.x - position.x, y: moveEnd.y - position.y }) < Math.max(radius - 12, 0)) {
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
