import StringAction from "../actions/types/StringAction";
import UPDATE_TEXT from "../actions/updateText";

export default function updateText(value: string): StringAction {
    return { 
        type: UPDATE_TEXT,
        value: value
    };
}