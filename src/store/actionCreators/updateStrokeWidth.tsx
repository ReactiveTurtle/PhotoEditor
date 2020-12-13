import NumberAction from "../actions/types/NumberAction";
import UPDATE_STROKE_WIDTH from "../actions/updateStrokeWidth";

export default function updateStrokeWidth(value: number): NumberAction {
    return { 
        type: UPDATE_STROKE_WIDTH,
        value: value
    };
}