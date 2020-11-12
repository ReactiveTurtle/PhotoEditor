import React from 'react';
import EditText from '../edittext/EditText';
import { replaceSelectedObject } from '../helper/EditorHelper';
import { dispatch, getEditor, render, setEditor } from '../statemanager/StateManager';
import { Circle } from '../structures/Circle';
import { Rectangle } from '../structures/Rectangle';
import { TextObject } from '../structures/TextObject';
import { Triangle } from '../structures/Triangle';
import { Types } from '../structures/Type';
import './ObjectParams.css';

function ColorPicker() {
    return (
        <div className="ObjectParams">
            <div>
                <EditText
                    id="EditText-fill"
                    title="Цвет заливки"
                    text="#FF00FF"
                    type="color"
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
                                objRTC.props.fillColor = input.value;
                                editor.selectedObject = null;

                                setEditor(editor);
                                dispatch(replaceSelectedObject, selectedObject);

                                input.onchange = null;
                                render();
                            }
                        }
                    }}></EditText>
                <EditText
                    id="EditText-stroke"
                    title="Цвет контура"
                    text="#888888"
                    type="color"
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
                                objRTC.props.strokeColor = input.value;
                                editor.selectedObject = null;

                                setEditor(editor);
                                dispatch(replaceSelectedObject, selectedObject);

                                input.onchange = null;
                                render();
                            }
                        }
                    }}></EditText>
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

                                setEditor(editor);
                                dispatch(replaceSelectedObject, selectedObject);

                                input.onchange = null;
                                render();
                            }
                        }
                    }}></EditText>
            </div>
        </div>
    );
}

export default ColorPicker;

export function getFillColor() {
    const colorInput = document.getElementById("EditText-fill") as HTMLInputElement;
    return colorInput.value;
}

export function getStrokeColor() {
    const colorInput = document.getElementById("EditText-stroke") as HTMLInputElement;
    return colorInput.value;
}


export function getStrokeWidth(): number {
    const colorInput = document.getElementById("EditText-strokeWidth") as HTMLInputElement;
    return parseInt(colorInput.value);
}
