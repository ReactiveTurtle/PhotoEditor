import { Art } from "../../structures/Art";
import { Circle } from "../../structures/Circle";
import { Rectangle } from "../../structures/Rectangle";
import { TextObject } from "../../structures/TextObject";
import { Triangle } from "../../structures/Triangle";
import REPLACE_SELECTED_OBJECT from "../actions/actionReplaceSelectedObject";
import SelectedObjectAction from "../actions/types/SelectedObjectAction";

function actionReplaceSelectedObject(obj: TextObject | Rectangle | Triangle | Circle | Art | null): SelectedObjectAction {
    return {
        type: REPLACE_SELECTED_OBJECT,
        value: obj
    };
}

export default actionReplaceSelectedObject;
