import { Vector2 } from '../structures/Vector2';
import { Rectangle } from '../structures/Rectangle';
import { Triangle } from '../structures/Triangle';
import { Circle } from '../structures/Circle';
import { SelectedArea } from '../structures/SelectedArea';
import { Types } from '../structures/Type';
import { TextObject } from '../structures/TextObject';
import { ObjectState } from '../viewmodel/ObjectState';

export function createRectangle(downStart: Vector2, moveEnd: Vector2, objectState: ObjectState): Rectangle {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: Math.min(downStart.y, moveEnd.y)
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: Math.max(downStart.y, moveEnd.y)
    };
    return {
        type: Types.Rectangle,
        position: {
            x: Math.round(start.x),
            y: Math.round(start.y)
        },
        size: {
            x: Math.round(end.x - start.x),
            y: Math.round(end.y - start.y)
        },
        rotation: 0,
        props: {
            fillColor: objectState.fillColor,
            strokeColor: objectState.strokeColor,
            strokeWidth: objectState.strokeWidth
        }
    }
}

export function createTriangle(downStart: Vector2, moveEnd: Vector2, objectState: ObjectState): Triangle {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: downStart.y
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: moveEnd.y
    };
    return {
        type: Types.Triangle,
        p0: {
            x: start.x,
            y: start.y,
        },
        p1: {
            x: end.x,
            y: start.y,
        },
        p2: {
            x: start.x / 2 + end.x / 2,
            y: end.y,
        },
        props: {
            fillColor: objectState.fillColor,
            strokeColor: objectState.strokeColor,
            strokeWidth: objectState.strokeWidth
        }
    }
}

export function createCircle(downStart: Vector2, moveEnd: Vector2, objectState: ObjectState): Circle {
    const len = Math.sqrt(Math.pow(moveEnd.x - downStart.x, 2) + Math.pow(moveEnd.y - downStart.y, 2));
    return {
        type: Types.Circle,
        position: {
            x: downStart.x,
            y: downStart.y
        },
        radius: len,
        props: {
            fillColor: objectState.fillColor,
            strokeColor: objectState.strokeColor,
            strokeWidth: objectState.strokeWidth
        }
    }
}

export function createText(downStart: Vector2, moveEnd: Vector2, objectState: ObjectState): TextObject {
    return {
        type: Types.TextObject,
        rectangle: createRectangle(downStart, moveEnd, objectState),
        text: objectState.text,
        textSize: objectState.textSize,
        textColor: objectState.textColor,
        fontName: objectState.fontName,
        padding: objectState.padding
    }
}

export function createArea(downStart: Vector2, moveEnd: Vector2, objectState: ObjectState): SelectedArea {
    const start: Vector2 = {
        x: Math.min(downStart.x, moveEnd.x),
        y: Math.min(downStart.y, moveEnd.y)
    };
    const end = {
        x: Math.max(downStart.x, moveEnd.x),
        y: Math.max(downStart.y, moveEnd.y)
    };
    return {
        type: Types.Area,
        position: start,
        size: {
            x: end.x - start.x,
            y: end.y - start.y
        },
    }
}