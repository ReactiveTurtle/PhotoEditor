import { ToolType } from "../../components/tool/Tools";
import ToolTypeAction from "../actions/types/ToolTypeAction";
import UPDATE_TOOL from "../actions/updateTool";

export default function updateTool(value: ToolType): ToolTypeAction {
    return { 
        type: UPDATE_TOOL,
        value: value
    };
}