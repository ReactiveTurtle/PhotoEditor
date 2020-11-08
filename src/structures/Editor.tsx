import { TextObject } from './TextObject';
import { Polygon } from './Polygon';
import { Art } from './Art';

export type Editor = {
    selectedObject: TextObject | Polygon | Art | null;
    canvas: ImageData;
};