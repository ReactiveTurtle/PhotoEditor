import { Types } from './Type';
import { Vector2 } from './Vector2';

export type SelectedArea = {
    type: Types;
    position: Vector2;
    size: Vector2;
};
