import React, { useEffect, useState } from 'react';
import './App.css';
import SelectSizePopup from './selectsizepopup/SelectSizePopup';
import Button from './button/Button';
import Canvas from './canvas/Canvas';
import ColorPicker from './colorpicker/ColorPicker';
import { exportObject } from './helpers/CanvasHelper';
import './structures/Vector2';
import Tools, { ToolType } from './tool/Tools';
import { redo, setEditor, undo } from './model/StateManager';

function App() {
    const [currentTool, setCurrentTool] = useState(ToolType.Rectangle);
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                console.log(e.code);
                if (e.code === "KeyZ") {
                    setEditor(undo());
                } else if (e.code === "KeyB") {
                    setEditor(redo());
                }
            }
        }
        window.addEventListener("keypress", listener)
        return () => {
            window.removeEventListener("keypress", listener);
        }
    })
    return (
        <div className="App"
            id="App">
            <Canvas tool={currentTool}></Canvas>
            <div className="App-scrollContent">
                <header className="App-header">
                    <Button text="Создать" onClick={() => {
                        const popup = document.getElementById("SelectSizePopup-out");
                        if (popup == null) {
                            return;
                        }
                        console.log("click");
                        popup.classList.remove("hidden");
                    }}></Button>
                    <Button text="Импорт" onClick={() => { }}></Button>
                    <Button text="Сохранить" onClick={() => { exportObject() }}></Button>
                </header>
                <Tools onSelected={(tool) => {
                    setCurrentTool(tool);
                }}></Tools>
            </div>
            <ColorPicker></ColorPicker>
            <SelectSizePopup></SelectSizePopup>
        </div>
    );
}

export default App;
