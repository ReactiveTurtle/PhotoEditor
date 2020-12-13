import { RGBAColor } from "../../structures/RGBAColor";
import RGBAColorAction from "../actions/types/RGBAColorAction";
import UPDATE_STROKE_COLOR from "../actions/updateStrokeColor";

export default function updateStrokeColor(value: RGBAColor): RGBAColorAction {
    return { 
        type: UPDATE_STROKE_COLOR,
        value: value
    };
}