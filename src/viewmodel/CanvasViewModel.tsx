import { Rectangle } from '../structures/Rectangle';
import { Triangle } from '../structures/Triangle';
import { Circle } from '../structures/Circle';
import { TextObject } from '../structures/TextObject';
import { Art } from '../structures/Art';
import { SelectedArea } from '../structures/SelectedArea';
import { Vector2 } from '../structures/Vector2';

export type CanvasViewModel = {
    isCanvasDown: boolean,
    start: Vector2
    tempObject: Rectangle | Triangle | Circle | TextObject | Art | SelectedArea | null,
    isMiddleMouseDown: boolean,
    middleMouseStart: Vector2,
    tempPoint: Vector2 | null,
    scale: number,

    canvasPosition: Vector2
}