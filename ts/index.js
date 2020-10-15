"use strict";
exports.__esModule = true;
exports.redo = exports.undo = exports.exportObject = exports.importObject = exports.applyFilter = exports.drawObject = exports.replaceSelectedObject = exports.cutSelectedArea = exports.moveSelectedArea = exports.selectArea = exports.editCanvasSize = exports.createNewCanvas = void 0;
function createNewCanvas(editor, size) {
    editor.canvas = new ImageData(size.x, size.y);
    editor.canvas.data.fill(255);
    return editor;
}
exports.createNewCanvas = createNewCanvas;
function copyImageData(dst, src, width, height, srcPosition) {
    if (srcPosition == undefined) {
        var defaultPosition;
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
function editCanvasSize(editor, size) {
    var imageData = new ImageData(size.x, size.y);
    imageData.data.fill(255);
    var minWidth = Math.min(size.x, editor.canvas.width);
    var minHeight = Math.min(size.y, editor.canvas.height);
    copyImageData(imageData, editor.canvas, minWidth, minHeight);
    editor.canvas.data.set(imageData.data);
    return editor;
}
exports.editCanvasSize = editCanvasSize;
function selectArea(editor, selectedArea) {
    var art;
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
exports.selectArea = selectArea;
function moveSelectedArea(editor, position) {
    editor.selectedObject.position = position;
    return editor;
}
exports.moveSelectedArea = moveSelectedArea;
function cutSelectedArea(editor) {
    var art;
    var selectedObject = editor.selectedObject;
    if (typeof editor.selectedObject == typeof art) {
        editor.canvas = selectedObject.image;
        editor.selectedObject = null;
    }
    return editor;
}
exports.cutSelectedArea = cutSelectedArea;
function replaceSelectedObject(history, editor, newSelectedObject) {
    if (editor.selectedObject != null) {
        drawObject(editor, editor.selectedObject);
    }
    if (newSelectedObject != null) {
        history.history.push(editor.canvas);
        history.currentHistoryPosition++;
    }
    editor.selectedObject = newSelectedObject;
}
exports.replaceSelectedObject = replaceSelectedObject;
function drawObject(editor, selectedObject) {
    var triangle;
    var rectangle;
    var circle;
    var art;
    var textObject;
    var canvas = document.createElement("canvas");
    canvas.width = editor.canvas.width;
    canvas.height = editor.canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.putImageData(editor.canvas, 0, 0);
    switch (typeof selectedObject) {
        case typeof triangle:
            editor.canvas.data.set(drawTriangle(canvas, selectedObject).data);
            break;
        case typeof rectangle:
            editor.canvas.data.set(drawRectangle(canvas, selectedObject).data);
            break;
        case typeof circle:
            editor.canvas.data.set(drawCircle(canvas, selectedObject).data);
            break;
        case typeof art:
            drawArt(editor.canvas, selectedObject);
            break;
        case typeof textObject:
            break;
    }
}
exports.drawObject = drawObject;
function drawRectangle(canvas, rectangle) {
    var ctx = canvas.getContext("2d");
    var strokeWidth = rectangle.strokeWidth / 2;
    ctx.beginPath();
    ctx.moveTo(rectangle.position.x - strokeWidth, rectangle.position.y - strokeWidth);
    ctx.lineTo(rectangle.position.x + rectangle.size.x + strokeWidth, rectangle.position.y - strokeWidth);
    ctx.lineTo(rectangle.position.x + rectangle.size.x + strokeWidth, rectangle.position.y + rectangle.size.y + strokeWidth);
    ctx.lineTo(rectangle.position.x - strokeWidth, rectangle.position.y + rectangle.size.y + strokeWidth);
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
function drawTriangle(canvas, triangle) {
    var ctx = canvas.getContext("2d");
    var strokeWidth = triangle.strokeWidth / 2;
    ctx.beginPath();
    ctx.moveTo(triangle.position.x - strokeWidth, triangle.position.y - strokeWidth);
    ctx.lineTo(triangle.position.x + triangle.size.x + strokeWidth, triangle.position.y - strokeWidth);
    ctx.lineTo(triangle.position.x + triangle.size.x / 2, triangle.position.y + triangle.size.y + strokeWidth);
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
function drawCircle(canvas, circle) {
    var ctx = canvas.getContext("2d");
    var strokeWidth = circle.strokeWidth / 2;
    ctx.arc(circle.position.x, circle.position.y, circle.radius + strokeWidth, 0, 2 * Math.PI, false);
    ctx.strokeStyle = circle.strokeColor;
    ctx.stroke();
    ctx.arc(circle.position.x, circle.position.y, circle.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = circle.fillColor;
    ctx.fill();
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
function drawArt(canvas, art) {
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
function drawText(canvas, text) {
    var ctx = canvas.getContext("2d");
    ctx.font = text.size.y + "px serif";
    ctx.fillStyle = text.color;
    ctx.fillText(text.text, text.position.x, text.position.y, text.size.x);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
function applyFilter(editor, filter) {
    var filterCopy = filter;
    if (filterCopy.length > 0 && filterCopy.charAt(0) == "#") {
        filterCopy = filterCopy.substring(1);
    }
    if (filterCopy.length == 6) {
        filterCopy = "FF" + filterCopy;
    }
    if (filterCopy.length != 8) {
        throw new ReferenceError("Incorrect format of 'filter' parameter: " + filter);
    }
    var colorLevels = [
        parseInt(filterCopy.substring(0, 2), 16) / 255,
        parseInt(filterCopy.substring(2, 4), 16) / 255,
        parseInt(filterCopy.substring(4, 6), 16) / 255,
        parseInt(filterCopy.substring(6, 8), 16) / 255,
    ]; // RGBA
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
exports.applyFilter = applyFilter;
function importObject(editor) {
    document.querySelector("input").onchange = function (e) {
        var inputElement = e.target;
        var file = inputElement.files[0], url = URL.createObjectURL(file), img = new Image();
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
exports.importObject = importObject;
function exportObject(editor, path) {
    var canvas = document.createElement("canvas");
    canvas.width = editor.canvas.width;
    canvas.height = editor.canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.putImageData(editor.canvas, 0, 0);
    var img = canvas.toDataURL(path);
    document.write('<img src="' + img + '"/>');
}
exports.exportObject = exportObject;
function undo(history, editor) {
    if (history.history.length > 0) {
        if (history.currentHistoryPosition > 0) {
            replaceSelectedObject(history, editor, null);
            history.currentHistoryPosition--;
            editor.canvas = history.history[history.currentHistoryPosition];
        }
    }
    return editor;
}
exports.undo = undo;
function redo(history, editor) {
    if (history.history.length > 0) {
        if (history.currentHistoryPosition < history.history.length - 1) {
            history.currentHistoryPosition++;
            editor.canvas = history.history[history.currentHistoryPosition];
        }
    }
    return editor;
}
exports.redo = redo;
