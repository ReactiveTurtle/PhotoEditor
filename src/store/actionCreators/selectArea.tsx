import { SelectedArea } from "../../structures/SelectedArea";
import SELECT_AREA from "../actions/selectArea";
import SelectedAreaAction from "../actions/types/SelectedAreaAction";

function selectArea(value: SelectedArea): SelectedAreaAction {
    return {
        type: SELECT_AREA,
        value: value
    };
}

export default selectArea;