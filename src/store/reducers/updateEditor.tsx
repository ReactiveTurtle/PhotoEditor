import { Reducer } from "react";
import { Editor } from "../../structures/Editor";
import SelectedObjectAction from "../actions/types/SelectedObjectAction";
import Vector2Action from "../actions/types/Vector2Action";
import updateCanvas from "./updateCanvas";

const updateEditor: Reducer<Editor | undefined, SelectedObjectAction | Vector2Action> = (editor, action) => {
    if (editor === undefined) {
        return editor;
    }
    switch (action.type) {
        default:
            return {
                canvas: updateCanvas(editor.canvas, action as Vector2Action),
                selectedObject: editor.selectedObject
            }
    }
}

export default updateEditor;