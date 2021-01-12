import { Reducer } from "redux";
import { RGBAColor } from "../../structures/RGBAColor";
import { ObjectState } from "../../viewmodel/ObjectState";
import NumberAction from "../actions/types/NumberAction";
import RGBAColorAction from "../actions/types/RGBAColorAction";
import StringAction from "../actions/types/StringAction";
import UPDATE_FILL_COLOR from "../actions/updateFillColor";
import UPDATE_FONT_NAME from "../actions/updateFontName";
import UPDATE_STROKE_COLOR from "../actions/updateStrokeColor";
import UPDATE_STROKE_WIDTH from "../actions/updateStrokeWidth";
import UPDATE_TEXT from "../actions/updateText";
import UPDATE_TEXT_COLOR from "../actions/updateTextColor";
import UPDATE_TEXT_PADDING from "../actions/updateTextPadding";
import UPDATE_TEXT_SIZE from "../actions/updateTextSize";

const updateObjectState: Reducer<ObjectState | undefined, RGBAColorAction | NumberAction | StringAction> =
    (state, action) => {
        if (state === undefined) {
            throw new Error();
        }
        switch (action.type) {
            case UPDATE_FILL_COLOR:
                return {
                    ...state,
                    fillColor: action.value as RGBAColor
                }
            case UPDATE_STROKE_COLOR:
                return {
                    ...state,
                    strokeColor: action.value as RGBAColor
                }
            case UPDATE_STROKE_WIDTH:
                return {
                    ...state,
                    strokeWidth: action.value as number
                }
            case UPDATE_TEXT:
                return {
                    ...state,
                    text: action.value as string
                }
            case UPDATE_TEXT_SIZE:
                return {
                    ...state,
                    textSize: action.value as number
                }
            case UPDATE_TEXT_COLOR:
                return {
                    ...state,
                    textColor: action.value as RGBAColor
                }
            case UPDATE_FONT_NAME:
                return {
                    ...state,
                    fontName: action.value as string
                }
            case UPDATE_TEXT_PADDING:
                return {
                    ...state,
                    padding: action.value as number
                }
            default:
                return state;
        }
    }

export default updateObjectState;