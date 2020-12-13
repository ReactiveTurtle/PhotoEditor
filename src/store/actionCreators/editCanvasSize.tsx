import { Vector2 } from "../../structures/Vector2";
import EDIT_CANVAS_SIZE from "../actions/editCanvasSize";
import Vector2Action from "../actions/types/Vector2Action";

function editCanvasSize(size: Vector2): Vector2Action {
    return {
        type: EDIT_CANVAS_SIZE,
        value: size
    };
}

export default editCanvasSize;