import React from 'react';
import Button from '../button/Button';
import './SelectSizePopup.css';
import { setEditor, getEditor, render, setSizePopupVisibility } from '../statemanager/StateManager';
import { createNewCanvas } from '../helpers/CanvasHelper';
import { Vector2 } from '../structures/Vector2';
import EditText from '../edittext/EditText';

function close() {
    setSizePopupVisibility(false);
    render();
}

const mSizePopupTemp: Vector2 = {
    x: 600,
    y: 400
}

export default function SelectSizePopup() {
    return (
        <div className="SelectSizePopup-out"
            onClick={() => close()}>
            <div className="SelectSizePopup"
                onClick={(e) => e.stopPropagation()}>
                <p className="SelectSizePopup-title">Введите размер холста</p>
                <EditText title="Ширина"
                    onChange={(e) => mSizePopupTemp.x = parseInt(e.target.value)}
                    text={mSizePopupTemp.x + ""}
                    type="number"
                    hintText="Введите число"></EditText>
                <EditText title="Высота"
                    onChange={(e) => mSizePopupTemp.y = parseInt(e.target.value)}
                    text={mSizePopupTemp.y + ""}
                    type="number"
                    hintText="Введите число"></EditText>
                <div className="SelectSizePopup-buttonWrapper">
                    <Button text="Создать" onClick={() => {
                        setEditor(createNewCanvas(getEditor(), mSizePopupTemp));
                        close();
                    }}></Button>
                </div>
            </div>
        </div>
    );
}
