import { Types } from './Type';
import { Vector2 } from './Vector2';

export type Art = {
	type: Types.Art,
	image: ImageData;
	size: Vector2;
	position: Vector2;
};