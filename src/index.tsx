import { getEditor, render, setEditor } from './statemanager/StateManager'
import reportWebVitals from './reportWebVitals';
import { drawObject } from './helpers/DrawHelper';
import { Rectangle } from './structures/Rectangle';
import { Types } from './structures/Type';
import { createNewCanvas } from './helpers/CanvasHelper';

setEditor(createNewCanvas(getEditor(), { x: 400, y: 600 }));
render();
setEditor(drawObject(getEditor(), {
    position: { x: 10, y: 20 },
    size: { x: 100, y: 60 },
    fillColor: "#FF00FF",
    strokeWidth: 2,
    strokeColor: "#FF0000",
    type: Types.Rectangle
} as Rectangle));
render();

reportWebVitals();
