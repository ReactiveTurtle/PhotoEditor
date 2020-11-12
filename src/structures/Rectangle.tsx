import { DrawProps } from "./DrawProps";
import { Types } from "./Type";
import { Vector2 } from "./Vector2";

export type Rectangle = {
    type: Types;
    position: Vector2;
    size: Vector2;
    props: DrawProps;
}