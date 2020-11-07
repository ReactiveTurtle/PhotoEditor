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
	x: number,
	y: number,
	radius: number,
	previous: Point | null
	next: Point | null
}

export function getCenter(polygon: Polygon): Vector2 {
    let isFirstVisited = false;
	let point: Point | null = polygon.firstPoint;
	let minX = 0;
	let minY = 0;
	let maxX = 0;
	let maxY = 0;
    while (point != null && (!isFirstVisited || point != polygon.firstPoint)) {
		if (!isFirstVisited) {
			isFirstVisited = true;
			minX = point.x;
			minY = point.y;
			maxX = point.x;
			maxY = point.y;
		} else {
			minX = Math.min(minX, point.x);
			minY = Math.min(minY, point.y);
			maxX = Math.max(maxX, point.x);
			minY = Math.max(maxY, point.y);
		}
	}
	return {
		x: maxX / 2 - minX / 2,
		y: maxY / 2 - minY / 2
	}
}
