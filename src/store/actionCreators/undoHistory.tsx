import { Action } from "redux";
import UNDO_HISTORY from "../actions/undoHistory";

function undoHistory(): Action {
    return {
        type: UNDO_HISTORY,
    };
}

export default undoHistory;