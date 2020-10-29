const ImageData = require('@canvas/image-data');

import { Editor, Art, ImageHistory, cutSelectedArea } from "../ts/index";
import { equalsCanvasData } from "../tests/helper";
test('test_cutSelectedArea', () => {
    const art: Art = {
        image: new ImageData(100, 100),
        position: null,
        size: null
    };
    const editor: Editor = {
        imageHistory: null,
        selectedObject: art,
        canvas: new ImageData(300, 400)
    };

    const dstEditor = cutSelectedArea(editor);
    expect(dstEditor.canvas.width).toEqual(art.image.width);
    expect(dstEditor.canvas.height).toEqual(art.image.height);
    expect(dstEditor.selectedObject).toBeNull();
    expect(equalsCanvasData(dstEditor.canvas.data, art.image.data)).toBeTruthy();
});
