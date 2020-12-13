import { Vector2 } from "../../structures/Vector2";
import CREATE_NEW_CANVAS from "../actions/createNewCanvas";
import Vector2Action from "../actions/types/Vector2Action";

function createNewCanvas(size: Vector2): Vector2Action {
    return {
        type: CREATE_NEW_CANVAS,
        value: size
    };
}

export default createNewCanvas;
