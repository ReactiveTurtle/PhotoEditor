import { Polygon } from './Polygon';
import { Types } from './Type';

export type Art = {
	type: Types.Art;
	image: ImageData;
	polygon: Polygon;
};