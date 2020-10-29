const ImageData = require('@canvas/image-data');

import { copyImageData } from "../ts/index";
import { equalsCanvasData } from "../tests/helper";

test('test_copyImageData', () => {
    const srcImageData = new ImageData(500, 300);
    const dstImageData = copyImageData(srcImageData);
    expect(dstImageData.width).toEqual(srcImageData.width);
    expect(dstImageData.height).toEqual(srcImageData.height);
    expect(equalsCanvasData(srcImageData.data, dstImageData.data)).toBeTruthy();
});
