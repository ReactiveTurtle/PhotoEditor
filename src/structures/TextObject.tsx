import { Rectangle } from './Rectangle';
import { Types } from './Type';

export type TextObject = {
	type: Types.TextObject;
	rectangle: Rectangle;	
	text: string;
	textColor: string;
	textSize: number;
};