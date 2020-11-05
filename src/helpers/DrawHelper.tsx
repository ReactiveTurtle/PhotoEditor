import { Art } from "../structures/Art";
import { Circle } from "../structures/Circle";
import { Polygon } from "../structures/Polygon";
import { TextObject } from "../structures/TextObject";
import { Types } from "../structures/Type";
import { Vector2 } from "../structures/Vector2";

export function drawObject(
    context: CanvasRenderingContext2D,
    size: Vector2,
    selectedObject: TextObject | Polygon | Circle | Art
) {
    let newImageData: ImageData | undefined;

    switch (selectedObject.type) {
        case Types.Polygon:
            newImageData = drawPolygon(context, size, selectedObject as Polygon);
            break;
        case Types.Circle:
            newImageData = drawCircle(context, size, selectedObject as Circle);
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
    ctx.beginPath();
    ctx.moveTo(
        polygon.position.x + polygon.points[0].x,
        polygon.position.y + polygon.points[0].y);
    polygon.points.forEach(element => {
        ctx.lineTo(polygon.position.x + element.x,
            polygon.position.y + element.y);
    });
    ctx.lineTo(
        polygon.position.x + polygon.points[0].x,
        polygon.position.y + polygon.points[0].y);
    if (polygon.points.length > 1) {
        ctx.lineTo(
            polygon.position.x + polygon.points[1].x,
            polygon.position.y + polygon.points[1].y);
    }
    ctx.fillStyle = polygon.fillColor;
    ctx.fill();

    ctx.beginPath();
    ctx.lineWidth = polygon.strokeWidth;
    ctx.moveTo(
        polygon.position.x + polygon.points[0].x,
        polygon.position.y + polygon.points[0].y);
    polygon.points.forEach(element => {
        ctx.lineTo(polygon.position.x + element.x,
            polygon.position.y + element.y);
    });
    ctx.lineTo(
        polygon.position.x + polygon.points[0].x,
        polygon.position.y + polygon.points[0].y);
    if (polygon.points.length > 1) {
        ctx.lineTo(
            polygon.position.x + polygon.points[1].x,
            polygon.position.y + polygon.points[1].y);
    }
    ctx.strokeStyle = polygon.strokeColor;
    ctx.stroke();
    return ctx.getImageData(0, 0, size.x, size.y);
}

function drawCircle(ctx: CanvasRenderingContext2D,
    size: Vector2,
    circle: Circle) {
    let strokeWidth = circle.strokeWidth / 2;
    ctx.lineWidth = circle.strokeWidth;
    ctx.beginPath();
    ctx.arc(
        circle.position.x + circle.radius,
        circle.position.y + circle.radius,
        circle.radius + strokeWidth,
        0,
        2 * Math.PI,
        false
    );
    ctx.strokeStyle = circle.strokeColor;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        circle.position.x + circle.radius,
        circle.position.y + circle.radius,
        circle.radius,
        0,
        2 * Math.PI,
        false
    );
    ctx.fillStyle = circle.fillColor;
    ctx.fill();
    return ctx.getImageData(0, 0, size.x, size.y);
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