import { Art } from "../structures/Art";
import { Circle } from "../structures/Circle";
import { Editor } from "../structures/Editor";
import { Rectangle } from "../structures/Rectangle";
import { TextObject } from "../structures/TextObject";
import { Triangle } from "../structures/Triangle";
import { copyImageData } from "./CanvasHelper";
import { drawObject } from "./DrawHelper";

export function replaceSelectedObject(
    editor: Editor,
    newSelectedObject: Rectangle | Triangle | Circle | TextObject | Art | null
) {
    let newEditor: Editor = {
        ...editor,
        selectedObject: newSelectedObject,
    };
    if (editor.selectedObject != null) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (canvas != null) {
            const ctx = canvas.getContext("2d");
            if (ctx != null) {
                ctx.putImageData(editor.canvas, 0, 0);
                newEditor.canvas = drawObject(ctx,
                    { x: editor.canvas.width, y: editor.canvas.height },
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
