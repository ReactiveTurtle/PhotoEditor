import { Types } from './Type';
import { Vector2 } from './Vector2';

export type Circle = {
	type: Types.Circle,
	fillColor: string;
	strokeColor: string;
	strokeWidth: number;
	radius: number;
	size: Vector2;
	position: Vector2;
};
