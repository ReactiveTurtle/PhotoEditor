import { Editor, createNewCanvas, Vector2 } from "../ts/index"

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
let editor: Editor = {
    canvas: null,
    selectedObject: null,
    imageHistory: null
};
editor = createNewCanvas(editor, { x: 600, y: 600 });
render(editor);
function render(editor: Editor) {
    syncCanvas(canvas, editor);
}

function syncCanvas(htmlCanvas: HTMLCanvasElement, editor: Editor) {
    const context = htmlCanvas.getContext("2d");
    canvas.width = editor.canvas.width;
    canvas.height = editor.canvas.height;
    context.putImageData(editor.canvas, 0, 0);
}
