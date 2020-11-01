import React from 'react';
import Button from '../button/Button';
import './SelectSizePopup.css';
import { setEditor, getEditor, render, setSizePopupVisibility } from '../statemanager/StateManager';
import { createNewCanvas } from '../helpers/CanvasHelper';
import { Vector2 } from '../structures/Vector2';

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
                <p className="SelectSizePopup-title">Введите размер полотна</p>
                <div className="SelectSizePopup-input">
                    <input className="Number-input" id="newWidth"
                        type="number"
                        min="1"
                        defaultValue={mSizePopupTemp.x}
                        placeholder="Введите число"
                        onChange={(e) => mSizePopupTemp.x = parseInt(e.target.value)}></input>
                    <label className="Number-label" htmlFor="newWidth">Ширина</label>
                </div>
                <div className="SelectSizePopup-input">
                    <input className="Number-input" id="newHeight"
                        type="number"
                        min="1"
                        defaultValue={mSizePopupTemp.y}
                        placeholder="Введите число"
                        onChange={(e) => mSizePopupTemp.y = parseInt(e.target.value)}></input>
                    <label className="Number-label" htmlFor="newHeight">Высота</label>
                </div>
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
