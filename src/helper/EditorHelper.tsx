import pushToHistory from "../store/actionCreators/pushToHistory";
import setEditor from "../store/actionCreators/setEditor";
import { Art } from "../structures/Art";
import { Circle } from "../structures/Circle";
import { Editor } from "../structures/Editor";
import { Rectangle } from "../structures/Rectangle";
import { TextObject } from "../structures/TextObject";
import { Triangle } from "../structures/Triangle";
import { copyImageData } from "./CanvasHelper";
import { drawObject } from "./DrawHelper";

export function replaceSelectedObjectWithHistory(
    dispatch: Function,
    editor: Editor,
    newSelectedObject: Rectangle | Triangle | Circle | TextObject | Art | null,
    historyImage: ImageData | null = null) {
        const newEditor = replaceSelectedObject(editor, newSelectedObject);
        if (historyImage == null) {
            dispatch(pushToHistory(newEditor.canvas));
        } else {
            dispatch(pushToHistory(historyImage));
        }
        dispatch(setEditor(newEditor));
}

export function replaceSelectedObject(
    editor: Editor,
    newSelectedObject: Rectangle | Triangle | Circle | TextObject | Art | null
) {
    let newEditor: Editor = {
        ...editor,
        selectedObject: newSelectedObject,
    };
    if (editor.selectedObject != null) {
        const canvas = document.createElement("canvas");
        canvas.width = editor.canvas.width;
        canvas.height = editor.canvas.height;
        if (canvas != null) {
            const ctx = canvas.getContext("2d");
            if (ctx != null) {
                ctx.putImageData(editor.canvas, 0, 0);
                newEditor.canvas = drawObject(ctx, { x: editor.canvas.width, y: editor.canvas.height },
                    editor.selectedObject);
            }
        }
    }
    return newEditor;
}

export function removeSelectedObject(
    editor: Editor) {
    let newEditor: Editor = {
        canvas: copyImageData(editor.canvas),
        selectedObject: null
    };
    return newEditor;
}
