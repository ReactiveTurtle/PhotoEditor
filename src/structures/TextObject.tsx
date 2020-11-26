import { Rectangle } from './Rectangle';
import { RGBAColor } from './RGBAColor';
import { Types } from './Type';

export type TextObject = {
	type: Types.TextObject;
	rectangle: Rectangle;	
	text: string;
	textColor: RGBAColor;
	textSize: number;
};