import { Editor } from "../../structures/Editor";
import SET_EDITOR from "../actions/setEditor";
import EditorAction from "../actions/types/EditorAction";

function setEditor(value: Editor): EditorAction {
    return {
        type: SET_EDITOR,
        value: value
    };
}

export default setEditor;