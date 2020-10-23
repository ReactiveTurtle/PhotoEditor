import { Editor, Vector2, createNewCanvas} from "./index";
var pixelworks = require('pixelworks');
var processor = new pixelworks.Processor({config: true});

function matchCanvasData(first: Uint8ClampedArray, second: Uint8ClampedArray) {
    expect(first.length).toBe(second.length);
    for (var i = 0; i < first.length; i++) {
        expect(first[i]).toBe(second[i]);
        if (first[i] != second[i]) {
            break;
        }
    }
}

test('test_createNewCanvas', () => {
    const editor: Editor = {
        selectedObject: null,
        canvas: new ImageData(500, 600)
    }

    const newEditor = createNewCanvas(editor, { x: 100, y: 200 })

    const canvas = new Uint8ClampedArray(100 * 200);
    canvas.fill(255);
    expect(newEditor.canvas.width).toEqual(100);
    expect(newEditor.canvas.height).toEqual(200);
    matchCanvasData(newEditor.canvas.data, canvas);
});


import { editCanvasSize } from "./index";
test('test_editCanvasSize', () => {
    const imageData = new ImageData(500, 600);
    imageData.data.fill(128);
    const editor: Editor = {
        selectedObject: null,
        canvas: imageData
    }

    const newEditor = editCanvasSize(editor, { x: 400, y: 200 })

    const canvas = new Uint8ClampedArray(400 * 200);
    canvas.fill(128);
    expect(newEditor.canvas.width).toEqual(400);
    expect(newEditor.canvas.height).toEqual(200);
    matchCanvasData(newEditor.canvas.data, canvas);
});
