import { Types } from './Type';
import { Vector2 } from './Vector2';

export type Triangle = {
	type: Types.Triangle,
	fillColor: string;
	strokeColor: string;
	strokeWidth: number;
	size: Vector2;
	position: Vector2;
};