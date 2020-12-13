import { Reducer } from "react";
import { copyImageData } from "../../helper/CanvasHelper";
import CREATE_NEW_CANVAS from "../actions/createNewCanvas";
import EDIT_CANVAS_SIZE from "../actions/editCanvasSize";
import Vector2Action from "../actions/types/Vector2Action";

const updateCanvas: Reducer<ImageData, Vector2Action> = (canvas, action) => {
    const size = action.value;
    switch (action.type) {
        case CREATE_NEW_CANVAS:
            const newCanvas = new ImageData(action.value.x, action.value.y);
            newCanvas.data.fill(255);
            return newCanvas;
        case EDIT_CANVAS_SIZE:
            let imageData = new ImageData(size.x, size.y);
            imageData.data.fill(255);
            let minWidth = Math.min(size.x, canvas.width);
            let minHeight = Math.min(size.y, canvas.height);

            for (let i = 0; i < minHeight; i++) {
                for (let j = 0; j < minWidth; j++) {
                    let dataIndex = (i * size.x + j) * 4;
                    let canvasDataIndex = (i * canvas.width + j) * 4;
                    for (let k = 0; k < 4; k++) {
                        imageData.data[dataIndex + k] = canvas.data[canvasDataIndex + k];
                    }
                }
            }
            return imageData;
        default:
            return copyImageData(canvas);
    }
}

export default updateCanvas;
