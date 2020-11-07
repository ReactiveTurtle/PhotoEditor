import { Vector2 } from "../structures/Vector2";

export function length(vector: Vector2) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
}