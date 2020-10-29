const ImageData = require('@canvas/image-data');

import { Editor, Art, SelectedArea, ImageHistory, selectArea } from "../ts/index";
test('test_selectArea', () => {
    const editor: Editor = {
        imageHistory: null,
        selectedObject: null,
        canvas: new ImageData(300, 400)
    };
    const srcSelectedArea = {
        position: {
            x: 10,
            y: 20
        },
        size: {
            x: 100,
            y: 50
        }
    };
    const newEditor = selectArea(editor, srcSelectedArea);
    const dstSelectedObject = <Art>newEditor.selectedObject;

    expect(dstSelectedObject.position).toEqual(srcSelectedArea.position);
    expect(dstSelectedObject.size).toEqual(srcSelectedArea.size);
});
