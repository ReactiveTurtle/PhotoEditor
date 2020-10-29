const ImageData = require('@canvas/image-data');

import { Editor, ImageHistory, redo } from "../ts/index";
test('test_redo', () => {
    const editor: Editor = {
        imageHistory: {
            history: [new ImageData(100, 100), new ImageData(200, 200), new ImageData(300, 400)],
            currentHistoryPosition: 1
        },
        selectedObject: null,
        canvas: new ImageData(200, 200)
    };
    
    const newEditor = redo(editor);

    expect(newEditor.canvas.width).toEqual(300);
    expect(newEditor.canvas.height).toEqual(400);
    expect(newEditor.selectedObject).toBeNull();
    expect(newEditor.imageHistory.currentHistoryPosition).toEqual(2);
});
