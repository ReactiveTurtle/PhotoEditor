import React, { useState } from 'react';
import Button from '../button/Button';
import './SelectSizePopup.css';
import '../index.css';
import { setEditor, getEditor } from '../model/StateManager';
import { createNewCanvas } from '../helpers/CanvasHelper';
import { Vector2 } from '../structures/Vector2';
import EditText from '../edittext/EditText';

export function closeSelectSizePopup() {
    const popup = document.getElementById("SelectSizePopup-out");
    if (popup == null) {
        return;
    }
    popup.classList.add("hidden");
}

export default function SelectSizePopup() {
    const [size] = useState<Vector2>({ x: 600, y: 400 })
    return (
        <div className="SelectSizePopup-out hidden"
            id="SelectSizePopup-out"
            onClick={(e) => {
                if (!e.defaultPrevented) {
                    closeSelectSizePopup()
                }
            }}>
            <div className="SelectSizePopup"
                onClick={(e) => {
                    e.preventDefault();
                }}>
                <p className="SelectSizePopup-title">Введите размер холста</p>
                <EditText title="Ширина"
                    onChange={(e) => size.x = parseInt(e.target.value)}
                    text={size.x + ""}
                    type="number"
                    hintText="Введите число"></EditText>
                <EditText title="Высота"
                    onChange={(e) => size.y = parseInt(e.target.value)}
                    text={size.y + ""}
                    type="number"
                    hintText="Введите число"></EditText>
                <div className="SelectSizePopup-buttonWrapper">
                    <Button text="Создать" onClick={() => {
                        setEditor(createNewCanvas(getEditor(), size));
                        closeSelectSizePopup();
                    }}></Button>
                </div>
            </div>
        </div>
    );
}
