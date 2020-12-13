import { Action } from "redux";
import REDO_HISTORY from "../actions/redoHistory";

function redoHistory(): Action {
    return {
        type: REDO_HISTORY,
    };
}

export default redoHistory;