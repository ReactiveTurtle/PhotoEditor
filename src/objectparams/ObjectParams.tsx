import React, { useState } from 'react';
import TextColorPicker from '../components/colopicker/TextColorPicker';
import { ToolType } from '../components/tool/Tools';
import EditText from '../edittext/EditText';
import { toRGBAColor } from '../helper/ColorHelper';
import { replaceSelectedObject } from '../helper/EditorHelper';
import { dispatch, getEditor, render, setEditor } from '../statemanager/StateManager';
import { Circle } from '../structures/Circle';
import { Rectangle } from '../structures/Rectangle';
import { RGBAColor } from '../structures/RGBAColor';
import { TextObject } from '../structures/TextObject';
import { Triangle } from '../structures/Triangle';
import { Types } from '../structures/Type';
import './ObjectParams.css';

interface ObjectParamsProps {
    tool: ToolType;
}

function ObjectParams({ tool }: ObjectParamsProps) {
    const [isTimerStarted, setTimerStarted] = useState<Boolean>(false);
    return (
        <div className="ObjectParams">
            <div className="ParamsList">
                <TextColorPicker
                    id="EditText-fill"
                    title="Цвет заливки"
                    defaultColor={toRGBAColor("#FF00FFFF")}
                    onChange={(color) => {
                        const editor = getEditor();
                        const selectedObject = editor.selectedObject;
                        if (selectedObject != null) {
                            if (selectedObject.type === Types.Rectangle
                                || selectedObject.type === Types.Triangle
                                || selectedObject.type === Types.Circle
                                || selectedObject.type === Types.TextObject) {
                                let objRTC: Rectangle | Triangle | Circle;
                                if (selectedObject.type === Types.TextObject) {
                                    objRTC = (selectedObject as TextObject).rectangle;
                                } else {
                                    objRTC = selectedObject as Rectangle | Triangle | Circle;
                                }
                                objRTC.props.fillColor = color;
                                editor.selectedObject = null;

                                if (!isTimerStarted) {
                                    setTimerStarted(true);
                                    setTimeout(() => {
                                        setEditor(editor);
                                        dispatch(replaceSelectedObject, selectedObject);
                                        render();
                                        setTimerStarted(false);
                                    }, 16);
                                }
                            }
                        }
                    }}></TextColorPicker>
                <TextColorPicker
                    id="EditText-stroke"
                    title="Цвет контура"
                    defaultColor={toRGBAColor("#888888FF")}
                    onChange={(color) => {
                        const editor = getEditor();
                        const selectedObject = editor.selectedObject;
                        if (selectedObject != null) {
                            if (selectedObject.type === Types.Rectangle
                                || selectedObject.type === Types.Triangle
                                || selectedObject.type === Types.Circle
                                || selectedObject.type === Types.TextObject) {
                                let objRTC: Rectangle | Triangle | Circle;
                                if (selectedObject.type === Types.TextObject) {
                                    objRTC = (selectedObject as TextObject).rectangle;
                                } else {
                                    objRTC = selectedObject as Rectangle | Triangle | Circle;
                                }
                                objRTC.props.strokeColor = color;
                                editor.selectedObject = null;

                                if (!isTimerStarted) {
                                    setTimerStarted(true);
                                    setTimeout(() => {
                                        setEditor(editor);
                                        dispatch(replaceSelectedObject, selectedObject);
                                        render();
                                        setTimerStarted(false);
                                    }, 16);
                                }
                            }
                        }
                    }}></TextColorPicker>
                <EditText
                    id="EditText-strokeWidth"
                    title="Толщина контура"
                    text="4"
                    min="0"
                    type="number"
                    onChange={(e) => {
                        const input = e.target as HTMLInputElement;
                        const editor = getEditor();
                        const selectedObject = editor.selectedObject;
                        if (selectedObject != null) {
                            if (selectedObject.type === Types.Rectangle
                                || selectedObject.type === Types.Triangle
                                || selectedObject.type === Types.Circle
                                || selectedObject.type === Types.TextObject) {
                                let objRTC: Rectangle | Triangle | Circle;
                                if (selectedObject.type === Types.TextObject) {
                                    objRTC = (selectedObject as TextObject).rectangle;
                                } else {
                                    objRTC = selectedObject as Rectangle | Triangle | Circle;
                                }
                                objRTC.props.strokeWidth = parseInt(input.value);
                                editor.selectedObject = null;

                                input.onchange = null;
                                if (!isTimerStarted) {
                                    setTimerStarted(true);
                                    setTimeout(() => {
                                        setEditor(editor);
                                        dispatch(replaceSelectedObject, selectedObject);
                                        render();
                                        setTimerStarted(false);
                                    }, 16);
                                }
                            }
                        }
                    }}></EditText>
            </div>
            <div className="ParamsList">
                {tool === ToolType.Text
                    && <EditText
                        id="EditText-text"
                        title="Текст"
                        text="Reactive Photo Editor"
                        type="text"
                        onChange={(e) => {
                            const input = e.target as HTMLInputElement;
                            const editor = getEditor();
                            const selectedObject = editor.selectedObject;
                            if (selectedObject != null) {
                                if (selectedObject.type === Types.TextObject) {
                                    let textObject = selectedObject as TextObject;
                                    textObject.text = getText();
                                    editor.selectedObject = null;

                                    input.onchange = null;
                                    if (!isTimerStarted) {
                                        setTimerStarted(true);
                                        setTimeout(() => {
                                            setEditor(editor);
                                            dispatch(replaceSelectedObject, selectedObject);
                                            render();
                                            setTimerStarted(false);
                                        }, 16);
                                    }
                                }
                            }
                        }}></EditText>
                }
                {tool === ToolType.Text
                    && <EditText
                        id="EditText-textSize"
                        title="Размер текста"
                        text="24"
                        min="1"
                        type="number"
                        onChange={(e) => {
                            const input = e.target as HTMLInputElement;
                            const editor = getEditor();
                            const selectedObject = editor.selectedObject;
                            if (selectedObject != null) {
                                if (selectedObject.type === Types.TextObject) {
                                    let textObject = selectedObject as TextObject;
                                    textObject.textSize = getTextSize();
                                    editor.selectedObject = null;

                                    input.onchange = null;
                                    if (!isTimerStarted) {
                                        setTimerStarted(true);
                                        setTimeout(() => {
                                            setEditor(editor);
                                            dispatch(replaceSelectedObject, selectedObject);
                                            render();
                                            setTimerStarted(false);
                                        }, 16);
                                    }
                                }
                            }
                        }}></EditText>
                }
                {tool === ToolType.Text
                    && <TextColorPicker
                        id="EditText-textColor"
                        title="Цвет текста"
                        defaultColor={toRGBAColor("#000000FF")}
                        onChange={(color) => {
                            const editor = getEditor();
                            const selectedObject = editor.selectedObject;
                            if (selectedObject != null) {
                                if (selectedObject.type === Types.TextObject) {
                                    let textObject = selectedObject as TextObject;
                                    textObject.textColor = color;
                                    editor.selectedObject = null;

                                    if (!isTimerStarted) {
                                        setTimerStarted(true);
                                        setTimeout(() => {
                                            setEditor(editor);
                                            dispatch(replaceSelectedObject, selectedObject);
                                            render();
                                            setTimerStarted(false);
                                        }, 16);
                                    }
                                }
                            }
                        }}></TextColorPicker>
                }
            </div>
        </div>
    );
}

export default ObjectParams;

export function getFillColor(): RGBAColor {
    const fiilColorInput = document.getElementById("EditText-fill") as HTMLInputElement;
    return toRGBAColor(fiilColorInput.value);
}

export function getStrokeColor(): RGBAColor {
    const strokeColorInput = document.getElementById("EditText-stroke") as HTMLInputElement;
    return toRGBAColor(strokeColorInput.value);
}

export function getStrokeWidth(): number {
    const strokeWidthInput = document.getElementById("EditText-strokeWidth") as HTMLInputElement;
    return parseInt(strokeWidthInput.value);
}

export function getText(): string {
    const textInput = document.getElementById("EditText-text") as HTMLInputElement;
    return textInput.value;
}

export function getTextSize(): number {
    const textInput = document.getElementById("EditText-textSize") as HTMLInputElement;
    return parseInt(textInput.value);
}

export function getTextColor(): RGBAColor {
    const textInput = document.getElementById("EditText-textColor") as HTMLInputElement;
    return toRGBAColor(textInput.value);
}
