import { Editor } from '../structures/Editor'
import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
let mEditor: Editor = {
    imageHistory: {
        history: [],
        currentHistoryPosition: 0
    },
    selectedObject: null,
    canvas: new ImageData(600, 400)
};

export function setEditor(editor: Editor): void {
    mEditor = editor;
    render();
}

function copyImageData(imageData: ImageData) {
    const newImageData: ImageData = new ImageData(
        imageData.width,
        imageData.height
    );
    newImageData.data.set(new Uint8ClampedArray(imageData.data));
    return newImageData;
}

export function getEditor(): Editor {
    return {
        imageHistory: {
            history: [],
            currentHistoryPosition: 0
        },
        selectedObject: null,
        canvas: copyImageData(mEditor.canvas),
    };
}

export function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );

}

let mIsSizePopupVisible = false;
export function setSizePopupVisibility(isVisible: boolean) {
    mIsSizePopupVisible = isVisible;
}

export function isSizePopupVisible(): boolean {
    return mIsSizePopupVisible;
}
