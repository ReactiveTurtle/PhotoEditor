type Vector2 = {
    x: number,
    y: number
}

type SelectedArea = {
    position: Vector2,
    size: Vector2
}

type TextObject = {
    text: string,
    color: string,
    size: Vector2,
    position: Vector2
}

type Triangle = {
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
    size: Vector2,
    position: Vector2
}

type Rectangle = {
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
    size: Vector2,
    position: Vector2
}

type Circle = {
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
    radius: number,
    position: Vector2
}

type Art = {
    image: ImageData,
    size: Vector2,
    position: Vector2
}

type Editor = {
    selectedObject: TextObject | Triangle | Rectangle | Circle | Art,
    canvas: ImageData
}

type ImageHistory = {
    history: Array<ImageData>,
    currentHistoryPosition: number
}

function createNewCanvas(editor: Editor, size: Vector2) {
    editor.canvas = new ImageData(size.x, size.y);
    editor.canvas.data.fill(255)
    return editor;
}

function copyImageData(dst: ImageData, src: ImageData, width?: number, height?: number, srcPosition?: Vector2) {
    if (srcPosition == undefined) {
        var defaultPosition: Vector2;
        defaultPosition.x = 0;
        defaultPosition.y = 0;
        srcPosition = defaultPosition;
    }
    if (width == undefined) {
        width = dst.width;
    }
    if (height == undefined) {
        height = dst.height;
    }
    for (var i = 0; i < height; i++) {
        for (var j = 0; i < width; j++) {
            var dstIndex = (i * width + j) * 4;
            var srcIndex = ((i + srcPosition.y) * src.width + j + srcPosition.x) * 4;
            for (var k = 0; k < 4; k++) {
                dst.data[dstIndex + k] = src.data[srcIndex + k];
            }
        }
    }
}

function editCanvasSize(editor: Editor, size: Vector2) {
    var imageData = new ImageData(size.x, size.y);
    imageData.data.fill(255);
    let minWidth = Math.min(size.x, editor.canvas.width);
    let minHeight = Math.min(size.y, editor.canvas.height);
    copyImageData(imageData, editor.canvas, minWidth, minHeight);
    editor.canvas.data.set(imageData.data);
    return editor;
}

function selectArea(editor: Editor, selectedArea: SelectedArea) {
    var art: Art;
    art.position = selectedArea.position;
    art.size = selectedArea.size;
    var imageData = new ImageData(art.size.x, art.size.y);
    art.image = imageData;
    for (var i = 0; i < art.size.x; i++) {
        for (var j = 0; i < art.size.y; j++) {
            var dstIndex = (i * art.size.x + j) * 4;
            var srcIndex = ((i + art.position.y) * art.image.width + j + art.position.x) * 4;
            for (var k = 0; k < 4; k++) {
                art.image.data[dstIndex + k] = editor.canvas.data[srcIndex + k];
            }
            art.image.data[srcIndex + 3] = 0;
        }
    }
    editor.selectedObject = art;
    return editor;
}

function moveSelectedArea(editor: Editor, position: Vector2) {
    editor.selectedObject.position = position;
    return editor;
}

function cutSelectedArea(editor: Editor) {
    var art: Art;
    var selectedObject = <Art>editor.selectedObject;
    if (typeof editor.selectedObject == typeof art) {
        editor.canvas = selectedObject.image;
        editor.selectedObject = null;
    }
    return editor;
}

function replaceSelectedObject(history: ImageHistory, editor: Editor, newSelectedObject: TextObject | Triangle | Rectangle | Circle | Art): void {
    if (editor.selectedObject != null) {
        drawObject(editor, editor.selectedObject);
    }
    if (newSelectedObject != null) {
        history.history.push(editor.canvas);
        history.currentHistoryPosition++;
    }
    editor.selectedObject = newSelectedObject;
}

function drawObject(editor: Editor, selectedObject: TextObject | Triangle | Rectangle | Circle | Art) {
    let triangle: Triangle;
    let rectangle: Rectangle;
    let circle: Circle;
    let art: Art;
    let textObject: TextObject;

    var canvas = document.createElement("canvas");
    canvas.width = editor.canvas.width;
    canvas.height = editor.canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.putImageData(editor.canvas, 0, 0);

    switch (typeof selectedObject) {
        case typeof triangle:
            editor.canvas.data.set(drawTriangle(canvas, <Triangle>selectedObject).data);
            break;
        case typeof rectangle:
            editor.canvas.data.set(drawRectangle(canvas, <Rectangle>selectedObject).data);
            break;
        case typeof circle:
            editor.canvas.data.set(drawCircle(canvas, <Circle>selectedObject).data);
            break;
        case typeof art:
            drawArt(editor.canvas, <Art>selectedObject);
            break;
        case typeof textObject:
            break;
    }
}

function drawRectangle(canvas: HTMLCanvasElement, rectangle: Rectangle): ImageData {
    var ctx = canvas.getContext("2d");
    let strokeWidth = rectangle.strokeWidth / 2;
    ctx.beginPath();
    ctx.moveTo(rectangle.position.x - strokeWidth,
        rectangle.position.y - strokeWidth);
    ctx.lineTo(rectangle.position.x + rectangle.size.x + strokeWidth,
        rectangle.position.y - strokeWidth);
    ctx.lineTo(rectangle.position.x + rectangle.size.x + strokeWidth,
        rectangle.position.y + rectangle.size.y + strokeWidth);
    ctx.lineTo(rectangle.position.x - strokeWidth,
        rectangle.position.y + rectangle.size.y + strokeWidth);
    ctx.strokeStyle = rectangle.strokeColor;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rectangle.position.x, rectangle.position.y);
    ctx.lineTo(rectangle.position.x + rectangle.size.x, rectangle.position.y);
    ctx.lineTo(rectangle.position.x + rectangle.size.x, rectangle.position.y + rectangle.size.y);
    ctx.lineTo(rectangle.position.x, rectangle.position.y + rectangle.size.y);
    ctx.fillStyle = rectangle.fillColor;
    ctx.fill();
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawTriangle(canvas: HTMLCanvasElement, triangle: Triangle) {
    var ctx = canvas.getContext("2d");
    let strokeWidth = triangle.strokeWidth / 2;
    ctx.beginPath();
    ctx.moveTo(triangle.position.x - strokeWidth,
        triangle.position.y - strokeWidth);
    ctx.lineTo(triangle.position.x + triangle.size.x + strokeWidth,
        triangle.position.y - strokeWidth);
    ctx.lineTo(triangle.position.x + triangle.size.x / 2,
        triangle.position.y + triangle.size.y + strokeWidth);
    ctx.strokeStyle = triangle.strokeColor;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(triangle.position.x, triangle.position.y);
    ctx.lineTo(triangle.position.x + triangle.size.x, triangle.position.y);
    ctx.lineTo(triangle.position.x + triangle.size.x / 2, triangle.position.y + triangle.size.y);
    ctx.fillStyle = triangle.fillColor;
    ctx.fill();
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawCircle(canvas: HTMLCanvasElement, circle: Circle) {
    var ctx = canvas.getContext("2d");
    let strokeWidth = circle.strokeWidth / 2;
    ctx.arc(circle.position.x, circle.position.y, circle.radius + strokeWidth, 0, 2 * Math.PI, false);
    ctx.strokeStyle = circle.strokeColor;
    ctx.stroke();

    ctx.arc(circle.position.x, circle.position.y, circle.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = circle.fillColor;
    ctx.fill();
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawArt(canvas: ImageData, art: Art) {
    for (var i = 0; i < art.size.x; i++) {
        for (var j = 0; i < art.size.y; j++) {
            var dstIndex = (i * art.size.x + j) * 4;
            var srcIndex = ((i + art.position.y) * art.image.width + j + art.position.x) * 4;
            for (var k = 0; k < 4; k++) {
                canvas.data[srcIndex + k] = art.image.data[dstIndex + k];
            }
        }
    }
}

function drawText(canvas: HTMLCanvasElement, text: TextObject) {
    var ctx = canvas.getContext("2d");
    ctx.font = `${text.size.y}px serif`;
    ctx.font.fontcolor(text.color);
    ctx.fillText(text.text, text.position.x, text.position.y, text.size.x);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function applyFilter(editor: Editor, filter: string) {
    let filterCopy = filter;
    if (filterCopy.startsWith("#")) {
        filterCopy = filterCopy.substring(1);
    }
    if (filterCopy.length == 6) {
        filterCopy = "FF" + filterCopy
    }
    if (filterCopy.length != 8) {
        throw new ReferenceError(`Incorrect format of 'filter' parameter: ${filter}`);
    }
    var colorLevels = [parseInt(filterCopy.substring(0, 2), 16) / 255,
    parseInt(filterCopy.substring(2, 4), 16) / 255,
    parseInt(filterCopy.substring(4, 6), 16) / 255,
    parseInt(filterCopy.substring(6, 8), 16) / 255
    ] // RGBA
    for (var i = 0; i < editor.canvas.height; i++) {
        for (var j = 0; i < editor.canvas.width; j++) {
            var dataIndex = (i * editor.canvas.width + j) * 4;
            for (var k = 0; k < 4; k++) {
                editor.canvas.data[dataIndex + k] *= colorLevels[k];
            }
        }
    }
    return editor;
}

function importObject(editor: Editor) {
    document.querySelector("input").onchange = function (e: Event) {
        var inputElement = <HTMLInputElement>e.target;
        var file = inputElement.files[0],
            url = URL.createObjectURL(file),
            img = new Image();

        img.onload = function () {
            URL.revokeObjectURL(img.src);
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            editor.canvas = ctx.getImageData(0, 0, img.width, img.height);
        };
        img.src = url;
    };
    return editor;
}

function exportObject(editor: Editor, path: string) {
    var canvas = document.createElement("canvas");
    canvas.width = editor.canvas.width;
    canvas.height = editor.canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.putImageData(editor.canvas, 0, 0);

    var img = canvas.toDataURL(path);
    document.write('<img src="' + img + '"/>');
}

function undo(history: ImageHistory, editor: Editor) {
    if (history.history.length > 0) {
        if (history.currentHistoryPosition > 0) {
            replaceSelectedObject(history, editor, null);
            history.currentHistoryPosition--;
            editor.canvas = history.history[history.currentHistoryPosition];
        }
    }
    return editor;
}

function redo(history: ImageHistory, editor: Editor) {
    if (history.history.length > 0) {
        if (history.currentHistoryPosition < history.history.length - 1) {
            history.currentHistoryPosition++;
            editor.canvas = history.history[history.currentHistoryPosition];
        }
    }
    return editor;
}

