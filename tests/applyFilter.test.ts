const ImageData = require('@canvas/image-data');

import { Editor, Filter, ImageHistory, applyFilter } from "../ts/index";
import { equalsCanvasData } from "../tests/helper";

function checkGreyFilter(first: ImageData, second: ImageData) {
    if (second.data.length == first.data.length) {
        return false;
    }
    for (let i = 0; i < first.height; i++) {
        for (let j = 0; j < first.width; j++) {
            const index = (i * first.width + j) * 4;
            let sum = first.data[index] + first.data[index + 1];
            sum += first.data[index + 2];
            let mean = Math.round(sum / 3);
            const isCorrect = second.data[index] == mean
                && second.data[index + 1] == mean
                && second.data[index + 2] == mean;
            if (!isCorrect) {
                return false;
            }
        }
    }
    return true;
}

test('test_applyFilter_Grey', () => {
    const srcImageData = new ImageData(400, 400);
    for (let i = 0; i < srcImageData.height; i++) {
        for (let j = 0; j < srcImageData.width; j++) {
            const index = (i * srcImageData.width + j) * 4;
            srcImageData.data[index + 0] = Math.round(Math.random() * 255);
            srcImageData.data[index + 1] = Math.round(Math.random() * 255);
            srcImageData.data[index + 2] = Math.round(Math.random() * 255);
        }
    }

    const editor: Editor = {
        imageHistory: null,
        selectedObject: null,
        canvas: srcImageData
    };

    const dstEditor = applyFilter(editor, Filter.Grey);
    expect(dstEditor.canvas.width).toEqual(srcImageData.width);
    expect(dstEditor.canvas.height).toEqual(srcImageData.height);
    checkGreyFilter(srcImageData, dstEditor.canvas);
});

function checkLevelFilter(first: ImageData, second: ImageData, levels: Array<number>) {
    if (second.data.length == first.data.length) {
        return false;
    }
    for (let i = 0; i < first.height; i++) {
        for (let j = 0; j < first.width; j++) {
            const index = (i * first.width + j) * 4;
            const isCorrect =
                second.data[index] == first.data[index] * levels[0]
                && second.data[index + 1] == first.data[index + 1] * levels[1]
                && second.data[index + 2] == first.data[index + 2] * levels[2]
                && second.data[index + 3] == first.data[index + 3] * levels[3];
            if (!isCorrect) {
                return false;
            }
        }
    }
    return true;
}

test('test_applyFilter_Level', () => {
    const srcImageData = new ImageData(400, 400);
    for (let i = 0; i < srcImageData.height; i++) {
        for (let j = 0; j < srcImageData.width; j++) {
            const index = (i * srcImageData.width + j) * 4;
            srcImageData.data[index + 0] = Math.round(Math.random() * 255);
            srcImageData.data[index + 1] = Math.round(Math.random() * 255);
            srcImageData.data[index + 2] = Math.round(Math.random() * 255);
        }
    }

    const editor: Editor = {
        imageHistory: null,
        selectedObject: null,
        canvas: srcImageData
    };

    const dstEditor = applyFilter(editor, Filter.Red);
    expect(dstEditor.canvas.width).toEqual(srcImageData.width);
    expect(dstEditor.canvas.height).toEqual(srcImageData.height);
    checkLevelFilter(srcImageData, dstEditor.canvas, [1, 0, 0, 1]);
});
