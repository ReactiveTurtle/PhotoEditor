import { Art } from "../structures/Art";
import { Circle } from "../structures/Circle";
import { Rectangle } from "../structures/Rectangle";
import { TextObject } from "../structures/TextObject";
import { Triangle } from "../structures/Triangle";
import { Types } from "../structures/Type";
import { Vector2 } from "../structures/Vector2";
import { getRGB } from "./ColorHelper";
import canvasTxt from 'canvas-txt';

export function drawImageData(
    context: CanvasRenderingContext2D,
    imageData: ImageData) {
    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        throw new Error();
    }
    ctx.putImageData(imageData, 0, 0);
    context.drawImage(canvas, 0, 0);
    canvas.remove();
}

export function drawObject(
    context: CanvasRenderingContext2D,
    size: Vector2,
    selectedObject: TextObject | Rectangle | Triangle | Circle | Art
) {
    let newImageData: ImageData | undefined;
    const canvasSize = {
        x: size.x,
        y: size.y
    }
    switch (selectedObject.type) {
        case Types.Rectangle:
            newImageData = drawRectangle(context, canvasSize, selectedObject as Rectangle);
            break;
        case Types.Triangle:
            newImageData = drawTriangle(context, canvasSize, selectedObject as Triangle);
            break;
        case Types.Circle:
            newImageData = drawCircle(context, canvasSize, selectedObject as Circle);
            break;
        case Types.Art:
            newImageData = drawArt(context, canvasSize, selectedObject as Art);
            break;
        case Types.TextObject:
            newImageData = drawText(context, canvasSize, selectedObject as TextObject);
            break;
    };
    context.globalAlpha = 1;
    if (newImageData === undefined) {
        throw new Error();
    }
    return newImageData;
}

function drawRectangle(ctx: CanvasRenderingContext2D,
    canvasSize: Vector2,
    rectangle: Rectangle
): ImageData | undefined {
    ctx.beginPath();
    ctx.moveTo(rectangle.position.x, rectangle.position.y);
    ctx.lineTo(rectangle.position.x + rectangle.size.x, rectangle.position.y);
    ctx.lineTo(rectangle.position.x + rectangle.size.x, rectangle.position.y + rectangle.size.y);
    ctx.lineTo(rectangle.position.x, rectangle.position.y + rectangle.size.y);
    ctx.closePath();

    ctx.globalAlpha = rectangle.props.fillColor.a;
    ctx.fillStyle = getRGB(rectangle.props.fillColor);
    ctx.fill();

    if (rectangle.props.strokeWidth > 0) {
        const strokeWidth = rectangle.props.strokeWidth / 2;
        ctx.lineWidth = rectangle.props.strokeWidth;
        ctx.globalAlpha = rectangle.props.strokeColor.a;
        ctx.strokeStyle = getRGB(rectangle.props.strokeColor);
        ctx.beginPath();
        ctx.moveTo(rectangle.position.x - strokeWidth, rectangle.position.y - strokeWidth);
        ctx.lineTo(rectangle.position.x + rectangle.size.x + strokeWidth, rectangle.position.y - strokeWidth);
        ctx.lineTo(rectangle.position.x + rectangle.size.x + strokeWidth, rectangle.position.y + rectangle.size.y + strokeWidth);
        ctx.lineTo(rectangle.position.x - strokeWidth, rectangle.position.y + rectangle.size.y + strokeWidth);
        ctx.closePath();
        ctx.stroke();
    }
    return ctx.getImageData(0, 0, canvasSize.x, canvasSize.y);
}

function drawTriangle(ctx: CanvasRenderingContext2D,
    size: Vector2,
    triangle: Triangle
): ImageData | undefined {
    ctx.beginPath();
    ctx.moveTo(triangle.p0.x, triangle.p0.y);
    ctx.lineTo(triangle.p1.x, triangle.p1.y);
    ctx.lineTo(triangle.p2.x, triangle.p2.y);
    ctx.closePath();

    ctx.globalAlpha = triangle.props.fillColor.a;
    ctx.fillStyle = getRGB(triangle.props.fillColor);
    ctx.fill();

    if (triangle.props.strokeWidth > 0) {
        ctx.lineWidth = triangle.props.strokeWidth;
        ctx.globalAlpha = triangle.props.strokeColor.a;
        ctx.strokeStyle = getRGB(triangle.props.strokeColor);
        ctx.stroke();
    }
    return ctx.getImageData(0, 0, size.x, size.y);
}

function drawCircle(ctx: CanvasRenderingContext2D,
    size: Vector2,
    circle: Circle
): ImageData | undefined {
    ctx.beginPath();
    ctx.moveTo(circle.position.x + circle.radius, circle.position.y);
    ctx.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI * 2);
    ctx.closePath();

    ctx.globalAlpha = circle.props.fillColor.a;
    ctx.fillStyle = getRGB(circle.props.fillColor);
    ctx.fill();

    if (circle.props.strokeWidth > 0) {
        ctx.lineWidth = circle.props.strokeWidth;
        ctx.globalAlpha = circle.props.strokeColor.a;
        ctx.strokeStyle = getRGB(circle.props.strokeColor);
        ctx.stroke();
    }
    return ctx.getImageData(0, 0, size.x, size.y);
}

function drawArt(ctx: CanvasRenderingContext2D,
    size: Vector2, art: Art) {
    const canvasCtx = document.createElement("canvas");
    canvasCtx.width = art.image.width;
    canvasCtx.height = art.image.height;
    const imageCtx = canvasCtx.getContext("2d");
    if (imageCtx === null) {
        throw new Error();
    }
    imageCtx.putImageData(art.image, 0, 0);
    const canvasScaled = document.createElement("canvas");
    canvasScaled.width = Math.max(1, art.size.x);
    canvasScaled.height = Math.max(1, art.size.y);
    const imageScaled = canvasScaled.getContext("2d");
    if (imageScaled === null) {
        throw new Error();
    }
    imageScaled.scale(art.size.x / art.image.width, art.size.y / art.image.height);
    imageScaled.drawImage(canvasCtx, 0, 0);
    ctx.drawImage(canvasScaled, art.position.x, art.position.y);
    return ctx.getImageData(0, 0, size.x, size.y);
}

function drawText(ctx: CanvasRenderingContext2D,
    size: Vector2,
    text: TextObject) {
    drawRectangle(ctx, size, text.rectangle);
    ctx.globalAlpha = text.textColor.a;
    ctx.fillStyle = getRGB(text.textColor);

    const padding = text.padding;
    canvasTxt.fontSize = text.textSize;
    canvasTxt.font = text.fontName;
    canvasTxt.align = "left";
    canvasTxt.vAlign = "top";
    canvasTxt.lineHeight = text.textSize * 1.25;
    canvasTxt.drawText(ctx, text.text,
        text.rectangle.position.x + 2 + padding,
        text.rectangle.position.y + padding,
        text.rectangle.size.x - padding,
        text.rectangle.size.y - padding);

    return ctx.getImageData(0, 0, size.x, size.y);
}
