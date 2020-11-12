import { DrawProps } from "./DrawProps";
import { Types } from "./Type";
import { Vector2 } from "./Vector2";


export type Triangle = {
    type: Types;
    p0: Vector2;
    p1: Vector2;
    p2: Vector2;
    props: DrawProps;
}