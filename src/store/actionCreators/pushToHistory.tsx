import PUSH_TO_HISTORY from "../actions/pushToHistory";
import ImageDataAction from "../actions/types/ImageDataAction";

function pushToHistory(imageData: ImageData): ImageDataAction {
    return {
        type: PUSH_TO_HISTORY,
        value: imageData
    };
}

export default pushToHistory;