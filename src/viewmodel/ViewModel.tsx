import { ToolType } from "../components/tool/Tools";
import { Editor } from "../structures/Editor";
import { ImageHistory } from "../structures/ImageHistory";
import { CanvasViewModel } from "./CanvasViewModel";
import { ObjectState } from "./ObjectState";

export type ViewModel = {
    editor: Editor,
    imageHistory: ImageHistory,
    currentTool: ToolType,
    objectState: ObjectState,
    canvasModel: CanvasViewModel
}