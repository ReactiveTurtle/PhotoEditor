import { ToolType } from "../components/tool/Tools";
import { createNewCanvas } from "../helper/CanvasHelper";
import { toRGBAColor } from "../helper/ColorHelper";
import { ViewModel } from "../viewmodel/ViewModel";

const defaultEditor = createNewCanvas(
    {
        selectedObject: null,
        canvas: new ImageData(1, 1)
    },
    { x: 800, y: 600 });

const initialViewModel: ViewModel = {
    editor: defaultEditor,
    imageHistory: {
        history: [defaultEditor.canvas],
        currentHistoryPosition: 0
    },
    currentTool: ToolType.Rectangle,
    objectState: {
        fillColor: toRGBAColor("#00CCCCFF"),
        strokeColor: toRGBAColor("#CC0000FF"),
        strokeWidth: 4,
        text: "",
        textSize: 24,
        textColor: toRGBAColor("#424242FF"),
        fontName: "Arial",
        padding: 0,
    },
    canvasModel: {
        isCanvasDown: false,
        start: {x: 0, y: 0},
        tempObject: null,
        isMiddleMouseDown: false,
        middleMouseStart: {x: 0, y: 0},
        tempPoint: null,
        scale: 1,
        canvasPosition: {
            x: (window.innerWidth - defaultEditor.canvas.width) / 2,
            y: (window.innerHeight - defaultEditor.canvas.height) / 2
        }
    }
}

export default initialViewModel;
