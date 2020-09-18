class Rectangle {
    constructor(fillcolor = "#000000") {
        this.fillColor = fillcolor;
    }
}

class CanvasModel {
    constructor() {
        this.texts = [];
        this.primitives = [new Rectangle()];
        this.arts = [];
        this.selectedField = [];
    }

    draw(canvas) {
        let canvasContext = canvas.getContext("2d");
        this.primitives.forEach((value) => {
            canvasContext.fillColor = value.fillColor;
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        });
    }
}

const editor = {
    canvasModel: new CanvasModel(),
    canvasStates: [],
    filters: []
}

var canvas = document.getElementById("canvas");
canvas.style.overflow = "hidden";

canvas.width = innerWidth;
canvas.height = innerHeight;

editor.canvasModel.draw(canvas);

