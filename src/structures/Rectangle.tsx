import { Types } from './Type';
import { Vector2 } from './Vector2';

export type Rectangle = {
	type: Types.Rectangle,
	fillColor: string;
	strokeColor: string;
	strokeWidth: number;
	size: Vector2;
	position: Vector2;
};
