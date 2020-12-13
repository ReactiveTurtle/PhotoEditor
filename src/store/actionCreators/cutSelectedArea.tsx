import { Action } from "redux";
import CUT_SELECTED_AREA from "../actions/cutSelectedArea";

function cutSelectedArea(): Action {
    return {
        type: CUT_SELECTED_AREA,
    };
}

export default cutSelectedArea;