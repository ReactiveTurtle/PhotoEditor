import { Art } from "../structures/Art";
import { Point, Polygon } from "../structures/Polygon";
import { TextObject } from "../structures/TextObject";
import { Types } from "../structures/Type";
import { Vector2 } from "../structures/Vector2";
import { length } from "./VectorHelper";

export function drawObject(
    context: CanvasRenderingContext2D,
    size: Vector2,
    selectedObject: TextObject | Polygon | Art
) {
    let newImageData: ImageData | undefined;

    switch (selectedObject.type) {
        case Types.Polygon:
            newImageData = drawPolygon(context, size, selectedObject as Polygon);
            break;
        case Types.Art:
            newImageData = drawArt(context, size, selectedObject as Art);
            break;
        case Types.TextObject:
            newImageData = drawText(context, size, selectedObject as TextObject);
            break;
    };
    if (newImageData === undefined) {
        throw new Error();
    }
    return newImageData;
}

function drawPolygon(ctx: CanvasRenderingContext2D,
    size: Vector2,
    polygon: Polygon
): ImageData | undefined {
    createPath(ctx, polygon)
    ctx.fillStyle = polygon.fillColor;
    ctx.fill();

    ctx.lineWidth = polygon.strokeWidth;
    ctx.strokeStyle = polygon.strokeColor;
    ctx.stroke();
    return ctx.getImageData(0, 0, size.x, size.y);
}

function createPath(ctx: CanvasRenderingContext2D, polygon: Polygon): void {
    ctx.beginPath();
    let isFirstVisited = false;
    let point: Point | null = polygon.firstPoint;
    while (point != null && (!isFirstVisited || point != polygon.firstPoint)) {
        let point1;
        if (point.next != null && point.previous != null) {
            point1 = getPoint(point, point.previous)
        } else {
            point1 = { x: point.x, y: point.y }
        }

        if (!isFirstVisited) {
            isFirstVisited = true
            ctx.moveTo(point1.x + polygon.position.x, point1.y + polygon.position.y);
        } else {
            ctx.lineTo(point1.x + polygon.position.x, point1.y + polygon.position.y);
        }
        if (point.next != null && point.previous != null) {
            const point2 = getPoint(point, point.next);
            ctx.quadraticCurveTo(point.x + polygon.position.x, point.y + polygon.position.y,
                point2.x + polygon.position.x, point2.y + polygon.position.y);
        }
        point = point.next;
    }
    ctx.closePath();
}

function getPoint(first: Point, second: Point): Vector2 {
    const dir = {
        x: first.x - second.x,
        y: first.y - second.y
    }
    let len = length(dir);
    const cos = dir.x / len;
    const sin = dir.y / len;
    len -= first.radius;
    return {
        x: second.x + len * cos,
        y: second.y + len * sin
    }
}

function drawArt(ctx: CanvasRenderingContext2D,
    size: Vector2,
    art: Art) {
    ctx.putImageData(art.image, art.position.x, art.position.y)
    return ctx.getImageData(0, 0, size.x, size.y);
}

function drawText(ctx: CanvasRenderingContext2D,
    size: Vector2,
    text: TextObject) {
    ctx.font = `${text.size.y}px monospace`;
    ctx.fillStyle = text.color;
    ctx.fillText(text.text, text.position.x, text.position.y, text.size.x);
    return ctx.getImageData(0, 0, size.x, size.y);
}
