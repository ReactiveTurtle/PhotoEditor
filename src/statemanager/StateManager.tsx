import { Editor } from '../structures/Editor'
import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import { TextObject } from '../structures/TextObject';
import { Circle } from '../structures/Circle';
import { Art } from '../structures/Art';
import { drawObject } from '../helpers/DrawHelper';
import { ToolType } from '../tool/Tools';
import { Polygon } from '../structures/Polygon';

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
    console.log(mEditor.imageHistory.history.length);
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
    if (newSelectedObject != null) {
        newEditor.imageHistory.history.push(copyImageData(mEditor.canvas));
        newEditor.imageHistory.currentHistoryPosition++;
    }
    setEditor(newEditor);
}

export function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

let mCurrentTool: ToolType = ToolType.Rectangle;
export function setCurrentTool(tool: ToolType) {
    mCurrentTool = tool;
    render();
}

export function getCurrentTool(): ToolType {
    return mCurrentTool;
}

let mIsSizePopupVisible = false;
export function setSizePopupVisibility(isVisible: boolean) {
    mIsSizePopupVisible = isVisible;
}

export function isSizePopupVisible(): boolean {
    return mIsSizePopupVisible;
}
