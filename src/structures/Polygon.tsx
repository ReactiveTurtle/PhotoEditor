import { Types } from './Type';
import { Vector2 } from './Vector2';

export type Polygon = {
	type: Types.Polygon,
	fillColor: string;
	strokeColor: string;
	strokeWidth: number;
	points: Array<Vector2>
	size: Vector2;
	position: Vector2;
};
