import NumberAction from "../actions/types/NumberAction";
import UPDATE_TEXT_SIZE from "../actions/updateTextSize";

export default function updateTextSize(value: number): NumberAction {
    return { 
        type: UPDATE_TEXT_SIZE,
        value: value
    };
}