import { CanvasViewModel } from "../../viewmodel/CanvasViewModel";
import CanvasViewModelAction from "../actions/types/CanvasViewModelAction";
import UPDATE_CANVAS_VIEW_MODEL from "../actions/updateCanvasViewModel";

function updateCanvasViewModel(model: CanvasViewModel): CanvasViewModelAction {
    return {
        type: UPDATE_CANVAS_VIEW_MODEL,
        value: model
    };
}

export default updateCanvasViewModel;