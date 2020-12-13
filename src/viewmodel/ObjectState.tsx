import { RGBAColor } from "../structures/RGBAColor";

export type ObjectState = {
    fillColor: RGBAColor,
    strokeColor: RGBAColor,
    strokeWidth: number,
    text: string,
    textSize: number,
    textColor: RGBAColor
}