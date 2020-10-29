const ImageData = require('@canvas/image-data');

import { Editor, ImageHistory, editCanvasSize } from "../ts/index";
import { equalsCanvasData } from "../tests/helper";
test('test_editCanvasSize', () => {
    const editor: Editor = {
        imageHistory: null,
        selectedObject: null,
        canvas: new ImageData(300, 400)
    };
    editor.canvas.data.fill(127);

    const expectedSize = { x: 200, y: 300 };
    const expectedData = new Uint8ClampedArray(expectedSize.x * expectedSize.y * 4);
    expectedData.fill(127);

    const dstEditor = editCanvasSize(editor, expectedSize);
    expect(dstEditor.canvas.width).toEqual(expectedSize.x);
    expect(dstEditor.canvas.height).toEqual(expectedSize.y);
    expect(equalsCanvasData(dstEditor.canvas.data, expectedData)).toBeTruthy();
});
