import { DrawProps } from "./DrawProps";
import { Types } from "./Type";
import { Vector2 } from "./Vector2";

export type Circle = {
    type: Types;
    radius: number;
    position: Vector2;
    props: DrawProps;
}