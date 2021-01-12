import React, { useEffect, useRef, useState } from 'react';
import { drawImageData, drawObject } from '../../helper/DrawHelper';
import styles from './Canvas.module.css';
import { Types } from '../../structures/Type';
import { Vector2 } from '../../structures/Vector2';
import { Art } from '../../structures/Art';
import { TextObject } from '../../structures/TextObject';
import { Rectangle } from '../../structures/Rectangle';
import { Triangle } from '../../structures/Triangle';
import { Circle } from '../../structures/Circle';
import { SelectedArea } from '../../structures/SelectedArea';
import { createArea } from '../../helper/ObjectCreateHelper';
import removeSelectedObject from '../../store/actionCreators/removeSelectedObject';
import selectArea from '../../store/actionCreators/selectArea';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Editor } from '../../structures/Editor';
import { ViewModel } from '../../viewmodel/ViewModel';
import cutSelectedArea from '../../store/actionCreators/cutSelectedArea';
import pushToHistory from '../../store/actionCreators/pushToHistory';
import actionReplaceSelectedObject from '../../store/actionCreators/actionReplaceSelectedObject';
import { DrawProps } from '../../structures/DrawProps';
import { onMouseDown, onMouseMove, onMouseUp } from './CanvasHandler';
import { CanvasViewModel } from '../../viewmodel/CanvasViewModel';
import updateCanvasViewModel from '../../store/actionCreators/updateCanvasViewModel';
import updateText from '../../store/actionCreators/updateText';
import { toHexColor } from '../../helper/ColorHelper';
import { ToolType } from '../tool/Tools';
import { replaceSelectedObjectWithHistory } from '../../helper/EditorHelper';

interface CanvasProps {
    focused: boolean;
}

export default function Canvas({ focused }: CanvasProps) {
    const dispatch = useDispatch();

    const state: ViewModel = useSelector(
        (state: ViewModel) => state
    )
    const selectedObject = state.editor.selectedObject;
    const objectState = state.objectState;

    const canvasViewModel: CanvasViewModel = state.canvasModel;
    const tempObject = canvasViewModel.tempObject;

    const editor: Editor = useSelector(
        (state: ViewModel) => state.editor,
        shallowEqual
    )
    const imageData = editor.canvas;

    const position = canvasViewModel.canvasPosition;

    if (selectedObject != null) {
        if (selectedObject.type === Types.Rectangle ||
            selectedObject.type === Types.Triangle ||
            selectedObject.type === Types.Circle ||
            selectedObject.type === Types.TextObject) {
            let drawProps: DrawProps;
            if (selectedObject.type === Types.TextObject) {
                const textObject = selectedObject as TextObject;
                textObject.text = objectState.text;
                textObject.textSize = objectState.textSize;
                textObject.textColor = objectState.textColor;
                drawProps = textObject.rectangle.props;
            } else {
                drawProps = selectedObject.props;
            }
            drawProps.fillColor = objectState.fillColor;
            drawProps.strokeColor = objectState.strokeColor;
            drawProps.strokeWidth = objectState.strokeWidth;
        }
    }

    const canvasContainer = useRef<HTMLDivElement>(null);
    const canvasElement = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const scale = canvasViewModel.scale;
        if (canvasElement.current !== null && canvasContainer.current !== null) {
            canvasElement.current.width = imageData.width * scale;
            canvasElement.current.height = imageData.height * scale;
            if (canvasElement.current != null) {
                renderCanvas(canvasElement.current, scale, imageData, selectedObject, canvasViewModel.tempObject);
            }
        }
    })
    useEffect(() => {
        if (!focused) {
            return;
        }
        const scale = canvasViewModel.scale;
        const zoomIntensity = 0.1;
        const wheelListener = (e: WheelEvent) => {
            let newScale = scale;

            // Идеальная формула для масштабирования :)
            const scroll = e.deltaY < 0 ? 1 : -2;
            const zoom = Math.exp(scroll * zoomIntensity);
            newScale *= zoom;
            if (newScale > 4) {
                newScale = scale;
            }

            const newX = canvasViewModel.canvasPosition.x - (e.clientX / scale - canvasViewModel.canvasPosition.x / scale) * (newScale - scale)
            const newY = canvasViewModel.canvasPosition.y - (e.clientY / scale - canvasViewModel.canvasPosition.y / scale) * (newScale - scale)

            const newCanvasViewModel = {
                ...canvasViewModel,
                canvasPosition: {
                    x: newX,
                    y: newY,
                },
                scale: newScale
            }
            dispatch(updateCanvasViewModel(newCanvasViewModel));
        }
        window.addEventListener("wheel", wheelListener);

        const mouseDownListener = (e: MouseEvent) => {
            if (e.button === 1) {
                document.body.style.cursor = "move"
                if (canvasElement.current !== null) {
                    canvasElement.current.style.cursor = "move"
                }
                canvasViewModel.isMiddleMouseDown = true;
                canvasViewModel.middleMouseStart = { x: e.clientX, y: e.clientY }
                dispatch(updateCanvasViewModel(canvasViewModel));
            }
        };
        window.addEventListener("mousedown", mouseDownListener)

        const mouseMoveListener = (e: MouseEvent) => {
            if (canvasViewModel.isMiddleMouseDown && canvasElement.current !== null) {
                canvasViewModel.canvasPosition = ({
                    x: canvasViewModel.canvasPosition.x + (e.clientX - canvasViewModel.middleMouseStart.x),
                    y: canvasViewModel.canvasPosition.y + (e.clientY - canvasViewModel.middleMouseStart.y)
                });
                canvasElement.current.style.marginLeft = `${canvasViewModel.canvasPosition.x}px`;
                canvasElement.current.style.marginTop = `${canvasViewModel.canvasPosition.y}px`;

                canvasViewModel.middleMouseStart = { x: e.clientX, y: e.clientY };
                dispatch(updateCanvasViewModel(canvasViewModel));
            }
        };
        window.addEventListener("mousemove", mouseMoveListener);

        const mouseUpListener = (e: MouseEvent) => {
            if (e.button === 1) {
                document.body.style.cursor = "default";
                if (canvasElement.current !== null) {
                    canvasElement.current.style.cursor = "default"
                }
                canvasViewModel.isMiddleMouseDown = false;
                dispatch(updateCanvasViewModel(canvasViewModel));
            }
        };
        window.addEventListener("mouseup", mouseUpListener);
        return () => {
            window.removeEventListener("wheel", wheelListener);
            window.removeEventListener("mousedown", mouseDownListener);
            window.removeEventListener("mousemove", mouseMoveListener);
            window.removeEventListener("mouseup", mouseUpListener);
        }
    }, [canvasViewModel,
        dispatch,
        selectedObject,
        imageData, focused]);
    useEffect(() => {
        if (!focused) {
            return;
        }
        const listener = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                if (e.code === "KeyX") {
                    if (tempObject != null && tempObject.type === Types.Area) {
                        dispatch(selectArea(tempObject as SelectedArea));

                        let historyCanvas = editor.canvas;
                        dispatch(cutSelectedArea());
                        dispatch(pushToHistory(historyCanvas));

                        canvasViewModel.tempObject = null;
                        dispatch(updateCanvasViewModel(canvasViewModel));
                        dispatch(removeSelectedObject());
                    }
                } else if (e.code === "KeyA") {
                    if (selectedObject?.type !== Types.TextObject) {
                        const area = createArea({ x: 0, y: 0 }, { x: imageData.width, y: imageData.height }, objectState);
                        dispatch(selectArea(area));

                        const historyCanvas = editor.canvas;
                        dispatch(pushToHistory(historyCanvas));
                    }
                }
            } else {
                const handleUnfocus = () => {
                    replaceSelectedObjectWithHistory(dispatch, editor, null);
                    canvasViewModel.tempObject = null;
                    dispatch(updateCanvasViewModel(canvasViewModel));
                    dispatch(updateText(""));
                }
                switch (e.code) {
                    case "Escape":
                        if (!(tempObject != null && tempObject.type === Types.Area)) {
                            const historyCanvas = editor.canvas;
                            dispatch(actionReplaceSelectedObject(null));
                            dispatch(pushToHistory(historyCanvas));
                        }
                        handleUnfocus();
                        break;
                    case "Delete":
                        if (!(tempObject != null && tempObject.type === Types.Area)) {
                            dispatch(removeSelectedObject());
                        }
                        canvasViewModel.tempObject = null;
                        dispatch(updateCanvasViewModel(canvasViewModel));
                        dispatch(updateText(""));
                        break;
                    case "Enter":
                        if (e.shiftKey) {
                            break;
                        }
                        handleUnfocus();
                        break;
                }
            }
        }
        window.addEventListener("keydown", listener)
        return () => {
            window.removeEventListener("keydown", listener)
        }
    })
    const [firstTextFocus, setFirstTextFocus] = useState<boolean>(true);
    const textArea = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (selectedObject?.type === Types.TextObject && firstTextFocus) {
            setFirstTextFocus(false);
            textArea.current?.focus();
        } else if (state.currentTool !== ToolType.Text) {
            setFirstTextFocus(true);
        }
    }, [firstTextFocus, setFirstTextFocus, state, selectedObject])
    return (
        <div
            ref={canvasContainer}
            className={styles.CanvasContainer}>
            {selectedObject !== null && selectedObject.type === Types.TextObject &&
                <textarea
                    ref={textArea}
                    style={{
                        marginLeft: position.x +
                            ((selectedObject as TextObject).rectangle.position.x +
                                objectState.padding) * canvasViewModel.scale,
                        marginTop: position.y +
                            ((selectedObject as TextObject).rectangle.position.y +
                                objectState.padding) * canvasViewModel.scale,
                        position: "fixed",
                        width: ((selectedObject as TextObject).rectangle.size.x -
                            objectState.padding * 2) * canvasViewModel.scale,
                        height: ((selectedObject as TextObject).rectangle.size.y -
                            objectState.padding * 2) * canvasViewModel.scale,
                        resize: "none",
                        fontFamily: objectState.fontName,
                        fontSize: `${(selectedObject as TextObject).textSize * canvasViewModel.scale}px`,
                        lineHeight: `${(selectedObject as TextObject).textSize * canvasViewModel.scale * 1.25}px`,
                        backgroundColor: "#FFFFFF00",
                        border: "none",
                        outline: "none",
                        color: `${toHexColor(objectState.textColor)}`
                    }}
                    value={objectState.text}
                    onChange={(e) => {
                        dispatch(updateText(e.target.value))
                    }}
                >
                </textarea>
            }

            <canvas id="canvas"
                ref={canvasElement}
                className={styles.Canvas}
                style={{ marginLeft: position.x, marginTop: position.y }}
                onMouseDown={(e) => {
                    if (canvasElement.current) {
                        onMouseDown(e, dispatch, canvasElement.current, state);
                    }
                }}
                onMouseMove={(e) => {
                    if (canvasElement.current) {
                        onMouseMove(e, dispatch, canvasElement.current, state);
                    }
                }}
                onMouseUp={(e) => {
                    if (canvasElement.current) {
                        onMouseUp(e, dispatch, canvasElement.current, state);
                    }
                }}>
            </canvas>
        </div >
    );
}

function renderCanvas(canvas: HTMLCanvasElement, scale: number, imageData: ImageData,
    selectedObject: Rectangle | Triangle | Circle | TextObject | Art | null = null,
    tempCanvasObject: Rectangle | Triangle | Circle | TextObject | Art | SelectedArea | null = null) {
    if (canvas == null) {
        return;
    }
    const context = canvas.getContext("2d");
    if (context != null) {
        context.scale(scale, scale);
        drawImageData(context, imageData);

        if (selectedObject != null) {
            if (selectedObject.type === Types.TextObject) {
                context.putImageData(drawObject(context, { x: imageData.width, y: imageData.height }, (selectedObject as TextObject).rectangle), 0, 0);
            } else {
                context.putImageData(drawObject(context, { x: imageData.width, y: imageData.height }, selectedObject), 0, 0);
            }
            drawBorder(scale, selectedObject, context);
        }
        if (tempCanvasObject != null) {
            if (tempCanvasObject.type !== Types.Area) {
                let objRTCTA = tempCanvasObject as Rectangle | Triangle | Circle | TextObject | Art;
                if (objRTCTA.type === Types.TextObject) {
                    context.putImageData(drawObject(context, { x: imageData.width, y: imageData.height }, (objRTCTA as TextObject).rectangle), 0, 0);
                } else {
                    context.putImageData(drawObject(context, { x: imageData.width, y: imageData.height }, objRTCTA), 0, 0);
                }
            } else {
                drawBorder(scale, tempCanvasObject as SelectedArea, context);
            }
        }
        context.scale(1 / scale, 1 / scale);
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

function drawBorder(scale: number, obj: Rectangle | Triangle | Circle | TextObject | Art | SelectedArea, ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 2 / scale;

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
        let position = {
            x: objRA.position.x,
            y: objRA.position.y
        };
        let size = {
            x: objRA.size.x,
            y: objRA.size.y
        };
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
        ctx.strokeStyle = createGradient(ctx, position, size);
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
                radius / scale,
                0,
                2 * Math.PI,
                false
            );
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#424242"
            ctx.stroke();
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
                radius / scale,
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
