const ImageData = require('@canvas/image-data');

import { Editor, ImageHistory, createNewCanvas } from "../ts/index";
import { equalsCanvasData } from "../tests/helper";
test('test_createNewCanvas', () => {
    const editor: Editor = {
        imageHistory: {
            history: [new ImageData(100, 100), new ImageData(200, 200), new ImageData(300, 400)],
            currentHistoryPosition: 2
        },
        selectedObject: null,
        canvas: new ImageData(300, 400)
    };

    const expectedSize = { x: 500, y: 500 };
    const expectedData = new Uint8ClampedArray(expectedSize.x * expectedSize.y * 4);
    expectedData.fill(255);

    const dstEditor = createNewCanvas(editor, expectedSize);
    expect(dstEditor.canvas.width).toEqual(expectedSize.x);
    expect(dstEditor.canvas.width).toEqual(expectedSize.y);
    expect(equalsCanvasData(dstEditor.canvas.data, expectedData)).toBeTruthy();
});
