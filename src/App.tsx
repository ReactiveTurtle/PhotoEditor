import React from 'react';
import './App.css';
import SelectSizePopup from './selectsizepopup/SelectSizePopup';
import Button from './button/Button';
import Canvas from './canvas/Canvas';
import ColorPicker from './colorpicker/ColorPicker';
import { getEditor, isSizePopupVisible, render, setSizePopupVisibility } from './statemanager/StateManager';
import './structures/Vector2';

function App() {
    return (
        <div className="App">
            <Canvas editor={getEditor()}></Canvas>
            <div className="App-scrollContent">
                <header className="App-header">
                    <Button text="Создать" onClick={() => {
                        setSizePopupVisibility(true);
                        render();
                    }}></Button>
                    <Button text="Импорт" onClick={() => { }}></Button>
                    <Button text="Экспорт" onClick={() => { }}></Button>
                </header>
            </div>
            <ColorPicker></ColorPicker>
            {isSizePopupVisible() &&
                <SelectSizePopup></SelectSizePopup>
            }
        </div>
    );
}



export default App;
