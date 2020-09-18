const editor = {
    canvas: new Canvas(),
    canvasStates: [],
    filters: []
}

class Canvas {
    constructor() {
        this.texts = [];
        this.primitives = [new Rectangle()];
        this.arts = [];
        this.selectedField = [];
    }
}

class Rectangle {
    constructor(fillcolor = "#FFFFFF") {
        this.fillColor = fillcolor;
    }
}
