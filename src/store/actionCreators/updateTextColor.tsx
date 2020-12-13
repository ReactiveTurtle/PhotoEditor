import { RGBAColor } from "../../structures/RGBAColor";
import RGBAColorAction from "../actions/types/RGBAColorAction";
import UPDATE_TEXT_COLOR from "../actions/updateTextColor";

export default function updateTextColor(value: RGBAColor): RGBAColorAction {
    return { 
        type: UPDATE_TEXT_COLOR,
        value: value
    };
}