import StringAction from "../actions/types/StringAction";
import UPDATE_FONT_NAME from "../actions/updateFontName";

export default function updateFontName(value: string): StringAction {
    return { 
        type: UPDATE_FONT_NAME,
        value: value
    };
}