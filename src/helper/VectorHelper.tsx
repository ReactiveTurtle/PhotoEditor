import { Vector2 } from "../structures/Vector2";

export function length(vector: Vector2) {
    return Math.floor(Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)));
}

export function cosinus(first: Vector2, second: Vector2) {
    return (first.x * second.x + first.y * second.y) / (length(first) * length(second));
}