import React from 'react';
import EditText from '../edittext/EditText';
import { getEditor, render, replaceSelectedObject } from '../statemanager/StateManager';
import { Circle } from '../structures/Circle';
import { Polygon } from '../structures/Polygon';
import { Types } from '../structures/Type';
import './ColorPicker.css';

function ColorPicker() {
    return (
        <div className="ColorPicker">
            <div>
                <EditText
                    id="EditText-fill"
                    title="Цвет заливки"
                    text="#424242"
                    type="color"
                    onChange={(e) => {
                        const input = e.target as HTMLInputElement;
                        const editor = getEditor();
                        const selectedObject = editor.selectedObject;
                        if (selectedObject != null) {
                            if (selectedObject.type === Types.Polygon
                                || selectedObject.type === Types.Circle) {
                                const objRTC: Polygon | Circle = selectedObject;
                                objRTC.fillColor = input.value;
                                replaceSelectedObject(objRTC);
                                input.onchange = null;
                                requestAnimationFrame(render);
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
                            if (selectedObject.type === Types.Polygon
                                || selectedObject.type === Types.Circle) {
                                const objRTC: Polygon | Circle = selectedObject;
                                objRTC.strokeColor = input.value;
                                replaceSelectedObject(objRTC);
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
