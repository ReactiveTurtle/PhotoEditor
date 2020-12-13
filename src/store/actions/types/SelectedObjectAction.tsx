import { Art } from "../../../structures/Art";
import { Circle } from "../../../structures/Circle";
import { Rectangle } from "../../../structures/Rectangle";
import { TextObject } from "../../../structures/TextObject";
import { Triangle } from "../../../structures/Triangle";

type SelectedObjectAction = {
    type: string,
    value: TextObject | Rectangle | Triangle | Circle | Art | null
}

export default SelectedObjectAction;
