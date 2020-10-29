const ImageData = require('@canvas/image-data');

import { Editor, Vector2, Rectangle, moveSelectedObject } from "../ts/index";
test('test_moveSelectedObject', () => {
    const rect: Rectangle = {
        fillColor: "#FF0000",
        strokeColor: "#00FF00",
        strokeWidth: 2,
        size: {
            x: 500,
            y: 500
        },
        position: {
            x: 100,
            y: 100
        }
    };
    const editor: Editor = {
        imageHistory: null,
        selectedObject: rect,
        canvas: new ImageData(400, 400)
    };

    const newPos: Vector2 = { x: 120, y: 224 };
    const newEditor = moveSelectedObject(editor, newPos);

    const newRectangle = <Rectangle>newEditor.selectedObject;

    expect(newRectangle.size).toEqual(rect.size);
    expect(newRectangle.position).toEqual(newPos);
    expect(newRectangle.strokeWidth).toEqual(rect.strokeWidth);
});
