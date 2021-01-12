import { Action, Reducer } from "redux";
import { cutSelectedArea, selectArea } from "../../helper/CanvasHelper";
import { removeSelectedObject, replaceSelectedObject } from "../../helper/EditorHelper";
import { applyFilter } from "../../helper/FilterHelper";
import { pushToHistory, redoHistory, undoHistory } from "../../helper/HistoryHelper";
import { Editor } from "../../structures/Editor";
import { ViewModel } from "../../viewmodel/ViewModel";
import APPLY_FILTER from "../actions/applyFilter";
import CUT_SELECTED_AREA from "../actions/cutSelectedArea";
import PUSH_TO_HISTORY from "../actions/pushToHistory";
import REDO_HISTORY from "../actions/redoHistory";
import REMOVE_SELECTED_OBJECT from "../actions/removeSelectedObject";
import REPLACE_SELECTED_OBJECT from "../actions/actionReplaceSelectedObject";
import SELECT_AREA from "../actions/selectArea";
import SET_EDITOR from "../actions/setEditor";
import EditorAction from "../actions/types/EditorAction";
import FilterAction from "../actions/types/FilterAction";
import ImageDataAction from "../actions/types/ImageDataAction";
import NumberAction from "../actions/types/NumberAction";
import RGBAColorAction from "../actions/types/RGBAColorAction";
import SelectedAreaAction from "../actions/types/SelectedAreaAction";
import SelectedObjectAction from "../actions/types/SelectedObjectAction";
import StringAction from "../actions/types/StringAction";
import ToolTypeAction from "../actions/types/ToolTypeAction";
import Vector2Action from "../actions/types/Vector2Action";
import UNDO_HISTORY from "../actions/undoHistory";
import UPDATE_TOOL from "../actions/updateTool";
import updateEditor from "./updateEditor";
import updateObjectState from "./updateObjectState";
import UPDATE_CANVAS_VIEW_MODEL from "../actions/updateCanvasViewModel";
import CanvasViewModelAction from "../actions/types/CanvasViewModelAction";

const reducers: Reducer<ViewModel | undefined,
    EditorAction |
    SelectedObjectAction |
    Vector2Action |
    ToolTypeAction |
    RGBAColorAction |
    NumberAction |
    StringAction |
    CanvasViewModelAction |
    Action> =
    (state, action): ViewModel => {
        if (state === undefined) {
            throw new Error();
        }
        const editor = state.editor;
        let newEditor = {
            canvas: editor.canvas,
            selectedObject: editor.selectedObject
        };
        let imageHistory = state.imageHistory;
        switch (action.type) {
            case SET_EDITOR:
                return {
                    ...state,
                    editor: (action as EditorAction).value as Editor
                }
            case UNDO_HISTORY:
                return undoHistory(state);
            case REDO_HISTORY:
                return redoHistory(state);
            case PUSH_TO_HISTORY:
                return {
                    ...state,
                    imageHistory: pushToHistory(imageHistory, (action as ImageDataAction).value),
                }
            case UPDATE_TOOL:
                return {
                    ...state,
                    currentTool: (action as ToolTypeAction).value,
                }
            case APPLY_FILTER:
                let newImageHistory;
                newImageHistory = pushToHistory(imageHistory, newEditor.canvas);
                newEditor = applyFilter(newEditor, (action as FilterAction).value);
                newImageHistory = pushToHistory(imageHistory, newEditor.canvas);
                return {
                    ...state,
                    imageHistory: newImageHistory,
                    editor: newEditor
                }
            case SELECT_AREA:
                const area = selectArea(editor, (action as SelectedAreaAction).value);
                console.log(area);
                return {
                    ...state,
                    editor: area
                }
            case CUT_SELECTED_AREA:
                return {
                    ...state,
                    editor: cutSelectedArea(editor)
                }
            case REPLACE_SELECTED_OBJECT:
                newEditor = replaceSelectedObject(editor, (action as SelectedObjectAction).value);
                return {
                    ...state,
                    editor: newEditor
                };
            case REMOVE_SELECTED_OBJECT:
                return {
                    ...state,
                    editor: removeSelectedObject(editor)
                };
            case UPDATE_CANVAS_VIEW_MODEL:
                return {
                    ...state,
                    canvasModel: (action as CanvasViewModelAction).value
                }
            default:
                const updatedEditor = updateEditor(state.editor, action as SelectedObjectAction | Vector2Action);
                if (updatedEditor === undefined) {
                    throw new Error();
                }
                const objectState = updateObjectState(state.objectState, (action as RGBAColorAction | NumberAction | StringAction));
                if (objectState === undefined) {
                    throw new Error();
                }
                return {
                    editor: updatedEditor,
                    imageHistory: state.imageHistory,
                    currentTool: state.currentTool,
                    objectState: objectState,
                    canvasModel: state.canvasModel
                }
        }
    }

export default reducers;
