import { Types } from './Type';
import { Vector2 } from './Vector2';

export type Polygon = {
	type: Types.Polygon,
	fillColor: string;
	strokeColor: string;
	strokeWidth: number;
	firstPoint: Point | null;
	position: Vector2;
};

export type Point = {
	parent: Polygon,
	x: number,
	y: number,
	radius: number,
	previous: Point | null
	next: Point | null
}
