import { Editor } from "../structures/Editor";
import { ImageHistory } from "../structures/ImageHistory";
import { ViewModel } from "../viewmodel/ViewModel";
import { copyImageData } from "./CanvasHelper";
import { replaceSelectedObject } from "./EditorHelper";

export function pushToHistory(imageHistory: ImageHistory, canvas: ImageData): ImageHistory {
    const newArrayHistory = imageHistory.history.flatMap((imageData) => copyImageData(imageData));

    const newHistory = {
        history: newArrayHistory,
        currentHistoryPosition: imageHistory.currentHistoryPosition
    }
    while (newHistory.currentHistoryPosition < newHistory.history.length - 1) {
        newHistory.history.pop();
    }
    if (newHistory.currentHistoryPosition === newHistory.history.length - 1) {
        newHistory.currentHistoryPosition++;
    }
    newHistory.history.push(copyImageData(canvas));
    return newHistory;
}

export function undoHistory(state: ViewModel): ViewModel {
    let editor: Editor = {
        selectedObject: state.editor.selectedObject,
        canvas: state.editor.canvas
    };
    let imageHistory: ImageHistory = state.imageHistory;
    if (imageHistory.history.length > 0) {
        if (imageHistory.currentHistoryPosition > 0 || editor.selectedObject != null) {
            if (editor.selectedObject == null) {
                imageHistory.currentHistoryPosition--;
            } else {
                editor = replaceSelectedObject(editor, null);
                const historyCanvas = copyImageData(editor.canvas);
                imageHistory = pushToHistory(imageHistory, historyCanvas);
                if (state === undefined) {
                    throw new Error();
                }
                imageHistory.currentHistoryPosition--;
            }
            editor.canvas = copyImageData(
                imageHistory.history[imageHistory.currentHistoryPosition]
            );
        }
    }
    return {
        ...state,
        imageHistory: imageHistory,
        editor: editor
    }
}

export function redoHistory(state: ViewModel): ViewModel {
    let editor: Editor = {
        selectedObject: state.editor.selectedObject,
        canvas: state.editor.canvas
    };
    let imageHistory: ImageHistory = state.imageHistory;
    if (imageHistory.history.length > 0) {
        if (imageHistory.currentHistoryPosition < imageHistory.history.length - 1) {
            imageHistory.currentHistoryPosition++;
            editor.canvas = copyImageData(
                imageHistory.history[imageHistory.currentHistoryPosition]
            );
        }
    }
    return {
        ...state,
        editor: editor,
        imageHistory: imageHistory
    }
}
