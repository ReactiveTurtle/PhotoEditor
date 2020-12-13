import { Filter } from "../../structures/Filter";
import APPLY_FILTER from "../actions/applyFilter";
import FilterAction from "../actions/types/FilterAction";

function applyFilter(filter: Filter): FilterAction {
    return {
        type: APPLY_FILTER,
        value: filter
    };
}

export default applyFilter;