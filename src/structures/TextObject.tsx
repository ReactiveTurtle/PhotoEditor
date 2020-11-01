import { Types } from './Type';
import { Vector2 } from './Vector2';

export type TextObject = {
	type: Types.TextObject,
	text: string;
	color: string;
	size: Vector2;
	position: Vector2;
};