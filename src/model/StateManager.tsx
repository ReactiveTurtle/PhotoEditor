import { Editor } from '../structures/Editor'
import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import { TextObject } from '../structures/TextObject';
import { Circle } from '../structures/Circle';
import { Art } from '../structures/Art';
import { drawObject } from '../helpers/DrawHelper';
import { Polygon } from '../structures/Polygon';
import { renderCanvas } from '../canvas/Canvas';
import { ImageHistory } from '../structures/ImageHistory';

const imageHistory: ImageHistory = {
    history: [],
    currentHistoryPosition: 0
};

export function pushHistory(canvas: ImageData) {
    while (imageHistory.currentHistoryPosition < imageHistory.history.length - 1) {
        imageHistory.history.pop();
    }
    if (imageHistory.currentHistoryPosition === imageHistory.history.length - 1) {
        imageHistory.currentHistoryPosition++;
    }
    imageHistory.history.push(canvas);
}

let mEditor: Editor = {
    selectedObject: null,
    canvas: new ImageData(600, 400)
};


export function setEditor(editor: Editor): void {
    mEditor = editor;
    console.log(imageHistory.history.length + ", " + imageHistory.currentHistoryPosition);
    renderCanvas();
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

export function replaceSelectedObject(
    newSelectedObject: TextObject | Polygon | Circle | Art | null
) {
    let newEditor: Editor = {
        ...mEditor,
        selectedObject: newSelectedObject,
    };
    if (mEditor.selectedObject != null) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (canvas != null) {
            const ctx = canvas.getContext("2d");
            if (ctx != null) {
                ctx.putImageData(mEditor.canvas, 0, 0);
                newEditor.canvas = drawObject(ctx,
                    { x: mEditor.canvas.width, y: mEditor.canvas.height },
                    mEditor.selectedObject);
            }
        }
    }
    return newEditor;
}

export function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App />
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
                const editor = replaceSelectedObject(null);
                pushHistory(editor.canvas);
                imageHistory.currentHistoryPosition--;
                setEditor(editor);
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
