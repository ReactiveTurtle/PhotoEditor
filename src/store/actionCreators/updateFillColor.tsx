import { RGBAColor } from "../../structures/RGBAColor";
import RGBAColorAction from "../actions/types/RGBAColorAction";
import UPDATE_FILL_COLOR from "../actions/updateFillColor";

export default function updateFillColor(color: RGBAColor): RGBAColorAction {
    return { 
        type: UPDATE_FILL_COLOR,
        value: color
    };
}