function equalsCanvasData(first: Uint8ClampedArray, second: Uint8ClampedArray) {
    if (first.length != second.length) {
        return false;
    }
    for (var i = 0; i < first.length; i++) {
        if (first[i] != second[i]) {
            return false;
        }
    }
    return true;
}

export {
    equalsCanvasData
}