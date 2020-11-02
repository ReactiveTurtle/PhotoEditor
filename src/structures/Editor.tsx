import { ImageHistory } from './ImageHistory';
import { TextObject } from './TextObject';
import { Polygon } from './Polygon';
import { Circle } from './Circle';
import { Art } from './Art';

export type Editor = {
    imageHistory: ImageHistory;
    selectedObject: TextObject | Polygon | Circle | Art | null;
    canvas: ImageData;
};