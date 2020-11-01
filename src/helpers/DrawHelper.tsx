import { Art } from "../structures/Art";
import { Circle } from "../structures/Circle";
import { Editor } from "../structures/Editor";
import { Rectangle } from "../structures/Rectangle";
import { TextObject } from "../structures/TextObject";
import { Triangle } from "../structures/Triangle";
import { Types } from "../structures/Type";

export function drawObject(
    editor: Editor,
    selectedObject: TextObject | Triangle | Rectangle | Circle | Art
) {
    var mcanvas = document.getElementById("canvas");
    if (mcanvas == null || mcanvas === undefined) {
        throw new Error();
    }
    const canvas = mcanvas as HTMLCanvasElement;
    canvas.width = editor.canvas.width;
    canvas.height = editor.canvas.height;
    let newImageData: ImageData | undefined;

    switch (selectedObject.type) {
        case Types.Triangle:
            newImageData = drawTriangle(editor.canvas, canvas, selectedObject as Triangle);
            break;
        case Types.Rectangle:
            newImageData = drawRectangle(editor.canvas, canvas, selectedObject as Rectangle);
            break;
        case Types.Circle:
            newImageData = drawCircle(editor.canvas, canvas, selectedObject as Circle);
            break;
        case Types.Art:
            newImageData = new ImageData(editor.canvas.width, editor.canvas.height);
            drawArt(editor.canvas, newImageData, selectedObject as Art);
            break;
        case Types.TextObject:
            newImageData = drawText(editor.canvas, canvas, selectedObject as TextObject);
            break;
    };
    if (newImageData === undefined) {
        throw new Error();
    }
    const newEditor: Editor = {
        ...editor,
        canvas: newImageData,
    }
    return newEditor;
}

function drawRectangle(src: ImageData,
    canvas: HTMLCanvasElement,
    rectangle: Rectangle
): ImageData | undefined {
    var ctx = canvas.getContext("2d");
    if (ctx == null) {
        return undefined;
    }
    ctx.putImageData(src, 0, 0)
    let strokeWidth = rectangle.strokeWidth / 2;
    ctx.beginPath();
    ctx.moveTo(
        rectangle.position.x - strokeWidth,
        rectangle.position.y - strokeWidth
    );
    ctx.lineTo(
        rectangle.position.x + rectangle.size.x + strokeWidth,
        rectangle.position.y - strokeWidth
    );
    ctx.lineTo(
        rectangle.position.x + rectangle.size.x + strokeWidth,
        rectangle.position.y + rectangle.size.y + strokeWidth
    );
    ctx.lineTo(
        rectangle.position.x - strokeWidth,
        rectangle.position.y + rectangle.size.y + strokeWidth
    );
    ctx.lineTo(
        rectangle.position.x - strokeWidth,
        rectangle.position.y - strokeWidth
    );
    ctx.strokeStyle = rectangle.strokeColor;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rectangle.position.x, rectangle.position.y);
    ctx.lineTo(rectangle.position.x + rectangle.size.x, rectangle.position.y);
    ctx.lineTo(
        rectangle.position.x + rectangle.size.x,
        rectangle.position.y + rectangle.size.y
    );
    ctx.lineTo(rectangle.position.x, rectangle.position.y + rectangle.size.y);
    ctx.fillStyle = rectangle.fillColor;
    ctx.fill();
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawTriangle(src: ImageData,
    canvas: HTMLCanvasElement, triangle: Triangle) {
    var ctx = canvas.getContext("2d");
    if (ctx == null) {
        return undefined;
    }
    ctx.putImageData(src, 0, 0)
    let strokeWidth = triangle.strokeWidth / 2;
    ctx.beginPath();
    ctx.moveTo(
        triangle.position.x - strokeWidth,
        triangle.position.y - strokeWidth
    );
    ctx.lineTo(
        triangle.position.x + triangle.size.x + strokeWidth,
        triangle.position.y - strokeWidth
    );
    ctx.lineTo(
        triangle.position.x + triangle.size.x / 2,
        triangle.position.y + triangle.size.y + strokeWidth
    );
    ctx.strokeStyle = triangle.strokeColor;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(triangle.position.x, triangle.position.y);
    ctx.lineTo(triangle.position.x + triangle.size.x, triangle.position.y);
    ctx.lineTo(
        triangle.position.x + triangle.size.x / 2,
        triangle.position.y + triangle.size.y
    );
    ctx.fillStyle = triangle.fillColor;
    ctx.fill();
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawCircle(src: ImageData,
    canvas: HTMLCanvasElement, circle: Circle) {
    var ctx = canvas.getContext("2d");
    if (ctx == null) {
        return undefined;
    }
    ctx.putImageData(src, 0, 0)
    let strokeWidth = circle.strokeWidth / 2;
    ctx.arc(
        circle.position.x,
        circle.position.y,
        circle.radius + strokeWidth,
        0,
        2 * Math.PI,
        false
    );
    ctx.strokeStyle = circle.strokeColor;
    ctx.stroke();

    ctx.arc(
        circle.position.x,
        circle.position.y,
        circle.radius,
        0,
        2 * Math.PI,
        false
    );
    ctx.fillStyle = circle.fillColor;
    ctx.fill();
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawArt(src: ImageData,
    canvas: ImageData, art: Art) {
    const newImageData = new ImageData(canvas.width, canvas.height);
    for (var i = 0; i < art.size.y; i++) {
        for (var j = 0; j < art.size.x; j++) {
            var dstIndex = (i * art.size.x + j) * 4;
            var srcIndex =
                ((i + art.position.y) * art.image.width + j + art.position.x) * 4;
            for (var k = 0; k < 4; k++) {
                newImageData.data[srcIndex + k] = art.image.data[dstIndex + k];
            }
        }
    }
    return newImageData;
}

function drawText(src: ImageData,
    canvas: HTMLCanvasElement, text: TextObject) {
    var ctx = canvas.getContext("2d");
    if (ctx == null) {
        return undefined;
    }
    ctx.putImageData(src, 0, 0)
    ctx.font = `${text.size.y}px serif`;
    ctx.fillStyle = text.color;
    ctx.fillText(text.text, text.position.x, text.position.y, text.size.x);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}