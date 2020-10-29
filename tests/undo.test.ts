const ImageData = require('@canvas/image-data');

import { Editor, ImageHistory, undo } from "../ts/index";
test('test_undo_end', () => {
    const editor: Editor = {
        imageHistory: {
            history: [new ImageData(100, 100), new ImageData(200, 200), new ImageData(300, 400)],
            currentHistoryPosition: 2
        },
        selectedObject: null,
        canvas: new ImageData(300, 400)
    };
    const newEditor = undo(editor);

    expect(newEditor.canvas.width).toEqual(200);
    expect(newEditor.canvas.height).toEqual(200);
    expect(newEditor.selectedObject).toBeNull();
    expect(newEditor.imageHistory.currentHistoryPosition).toEqual(1);
});
