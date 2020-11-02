import React from 'react';
import './App.css';
import SelectSizePopup from './selectsizepopup/SelectSizePopup';
import Button from './button/Button';
import Canvas from './canvas/Canvas';
import ColorPicker from './colorpicker/ColorPicker';
import { isSizePopupVisible, render, setSizePopupVisibility } from './statemanager/StateManager';
import { exportObject } from './helpers/CanvasHelper';
import './structures/Vector2';
import Tools from './tool/Tools';

function App() {
    return (
        <div className="App">
            <Canvas></Canvas>
            <div className="App-scrollContent">
                <header className="App-header">
                    <Button text="Создать" onClick={() => {
                        setSizePopupVisibility(true);
                        render();
                    }}></Button>
                    <Button text="Импорт" onClick={() => { }}></Button>
                    <Button text="Сохранить" onClick={() => { exportObject() }}></Button>
                </header>
                <Tools></Tools>
            </div>
            <ColorPicker></ColorPicker>
            {isSizePopupVisible() &&
                <SelectSizePopup></SelectSizePopup>
            }
        </div>
    );
}



export default App;
