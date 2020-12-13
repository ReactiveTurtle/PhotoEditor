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
        fillColor: toRGBAColor("#FF00CCCC"),
        strokeColor: toRGBAColor("#FFCC0000"),
        strokeWidth: 4,
        text: "",
        textSize: 24,
        textColor: toRGBAColor("#FF424242")
    }
}

export default initialViewModel;
