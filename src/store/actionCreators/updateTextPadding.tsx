import NumberAction from "../actions/types/NumberAction";
import UPDATE_TEXT_PADDING from "../actions/updateTextPadding";

export default function updateTextPadding(value: number): NumberAction {
    return { 
        type: UPDATE_TEXT_PADDING,
        value: value
    };
}