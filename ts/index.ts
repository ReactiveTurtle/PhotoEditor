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
    type: Primitive,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
    size: Vector2,
    position: Vector2
}

type Rectangle = {
    type: Primitive,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
    size: Vector2,
    position: Vector2
}

type Circle = {
    type: Primitive,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
    radius: number,
    position: Vector2
}

enum Primitive {
    TRIANGLE, RECTANGLE, CIRCLE
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

function editCanvasSize(editor: Editor, size: Vector2) {
    var data = new Uint8ClampedArray(size.x * size.y * 4);
    data.fill(255);
    let minWidth = Math.min(size.x, editor.canvas.width);
    let minHeight = Math.min(size.y, editor.canvas.height);

    for (var i = 0; i < minHeight; i++) {
        for (var j = 0; i < minWidth; j++) {
            var dataIndex = (i * size.x + j) * 4;
            var canvasDataIndex = (i * editor.canvas.width + j) * 4;
            for (var k = 0; k < 4; k++) {
                data[dataIndex + k] = editor.canvas.data[canvasDataIndex + k]
            }
        }
    }
    editor.canvas.data.set(data);
    return editor;
}

function selectArea(editor: Editor, selectedArea: SelectedArea) {
    var art: Art;
    art.position = selectedArea.position;
    art.size = selectedArea.size;
    var imageData = new ImageData(art.size.x, art.size.y);
    art.image = imageData;
    for (var i = 0; i < art.size.y; i++) {
        for (var j = 0; i < art.size.x; j++) {
            var dataIndex = (i * art.size.x + j) * 4;
            var canvasDataIndex = ((i + art.position.y) * editor.canvas.width + j + art.position.x) * 4;
            for (var k = 0; k < 4; k++) {
                imageData.data[dataIndex + k] = editor.canvas.data[canvasDataIndex + k];
            }
            editor.canvas.data[canvasDataIndex + 3] = 0;
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
    if (typeof editor.selectedObject == typeof art) {

    }
    return editor;
}

function replaceSelectedObject(history: ImageHistory, editor: Editor, newSelectedObject: TextObject | Triangle | Rectangle | Circle | Art): void {
    if (editor.selectedObject != null) {
        drawObject(editor.canvas, editor.selectedObject);
    }
    if (newSelectedObject != null) {
        history.history.push(editor.canvas);
        history.currentHistoryPosition++;
    }
    editor.selectedObject = newSelectedObject;
}

function drawObject(canvas: ImageData, selectedObject: TextObject | Triangle | Rectangle | Circle | Art) {
    let triangle: Triangle;
    let rectangle: Rectangle;
    let circle: Circle;
    let art: Art;
    let textObject: TextObject;

    switch (typeof selectedObject) {
        case typeof triangle:
            break;
        case typeof rectangle:
            break;
        case typeof circle:
            break;
        case typeof art:
            break;
        case typeof textObject:
            break;
    }
}

function applyFilter(editor: Editor, filter: string) {
    let filterCopy = filter;
    if (filterCopy.length > 0) {
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

function exportObject(editor: Editor): void {
    var canvas = document.createElement("canvas");
    canvas.width = editor.canvas.width;
    canvas.height = editor.canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.putImageData(editor.canvas, 0, 0);

    var img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    document.body.appendChild(img);
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

