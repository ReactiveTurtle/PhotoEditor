import { Art } from "../structures/Art";
import { Circle } from "../structures/Circle";
import { Polygon } from "../structures/Polygon";
import { TextObject } from "../structures/TextObject";
import { Vector2 } from "../structures/Vector2";

const start: Vector2 = {
    x: 0,
    y: 0
};

export function setStart(x: number, y: number) {
    start.x = x;
    start.y = y;
}

export function getStart(): Vector2 {
    return {
        x: start.x,
        y: start.y
    }
}

const end: Vector2 = {
    x: 0,
    y: 0
}

export function setEnd(x: number, y: number) {
    end.x = x;
    end.y = y;
}

export function getEnd(): Vector2 {
    return {
        x: end.x,
        y: end.y
    }
}

let isDownCanvas = false;

export function setCanvasPressed(isDown: boolean) {
    isDownCanvas = isDown;
}

export function isCanvasPressed() {
    return isDownCanvas;
}

let tempObject: TextObject | Polygon | Circle | Art | null;

export function setCanvasObject(object: TextObject | Polygon | Circle | Art | null) {
    tempObject = object;
}

export function getCanvasObject() {
    return tempObject;
}
