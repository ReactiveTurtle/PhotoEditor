import { ImageHistory } from './ImageHistory';
import { TextObject } from './TextObject';
import { Triangle } from './Triangle';
import { Rectangle } from './Rectangle';
import { Circle } from './Circle';
import { Art } from './Art';

export type Editor = {
    imageHistory: ImageHistory;
    selectedObject: TextObject | Triangle | Rectangle | Circle | Art | null;
    canvas: ImageData;
};