import { TextObject } from './TextObject';
import { Art } from './Art';
import { Circle } from './Circle';
import { Triangle } from './Triangle';
import { Rectangle } from './Rectangle';

export type Editor = {
    selectedObject: Rectangle | Triangle | Circle | TextObject | Art | null;
    canvas: ImageData;
};