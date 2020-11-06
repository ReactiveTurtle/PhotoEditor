import { Editor } from '../structures/Editor'
import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import { ImageHistory } from '../structures/ImageHistory';
import { replaceSelectedObject } from '../helper/EditorHelper';

const imageHistory: ImageHistory = {
    history: [],
    currentHistoryPosition: 0
};

let mEditor: Editor = {
    selectedObject: null,
    canvas: new ImageData(600, 400)
};


export function setEditor(editor: Editor): void {
    mEditor = editor;
    console.log(imageHistory.history.length + ", " + imageHistory.currentHistoryPosition);
    render();
}

export function dispatch(fun: Function, param: any, isUpdateHistory: boolean = false) {
    setEditor(fun(getEditor(), param) as Editor);
    if (isUpdateHistory) {
        pushHistory(copyImageData(mEditor.canvas));
    }
}

function pushHistory(canvas: ImageData) {
    while (imageHistory.currentHistoryPosition < imageHistory.history.length - 1) {
        imageHistory.history.pop();
    }
    if (imageHistory.currentHistoryPosition === imageHistory.history.length - 1) {
        imageHistory.currentHistoryPosition++;
    }
    imageHistory.history.push(canvas);
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
        selectedObject: mEditor.selectedObject,
        canvas: copyImageData(mEditor.canvas),
    };
}

export function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App editor={getEditor()} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

export function undo() {
    let newCanvas: ImageData = mEditor.canvas;
    if (imageHistory.history.length > 0) {
        if (imageHistory.currentHistoryPosition > 0 || mEditor.selectedObject != null) {
            if (mEditor.selectedObject == null) {
                imageHistory.currentHistoryPosition--;
            } else {
                dispatch(replaceSelectedObject, null, true);
                imageHistory.currentHistoryPosition--;
                setEditor(mEditor);
            }
            newCanvas = copyImageData(
                imageHistory.history[imageHistory.currentHistoryPosition]
            );
        }
    }
    const newEditor: Editor = {
        ...mEditor,
        canvas: newCanvas
    };
    return newEditor;
}

export function redo() {
    const newEditor: Editor = {
        ...mEditor,
    };
    if (imageHistory.history.length > 0) {
        if (imageHistory.currentHistoryPosition < imageHistory.history.length - 1) {
            imageHistory.currentHistoryPosition++;
            newEditor.canvas = copyImageData(
                imageHistory.history[imageHistory.currentHistoryPosition]
            );
        }
    }
    return newEditor;
}
