import { Action } from "redux";
import REMOVE_SELECTED_OBJECT from "../actions/removeSelectedObject";

export default function removeSelectedObject(): Action {
    return {
        type: REMOVE_SELECTED_OBJECT
    };
}