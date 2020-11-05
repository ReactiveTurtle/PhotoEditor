import { getEditor, pushHistory, render, setEditor } from './statemanager/StateManager'
import reportWebVitals from './reportWebVitals';
import { createNewCanvas } from './helper/CanvasHelper';

setEditor(createNewCanvas(getEditor(), { x: 400, y: 600 }));
pushHistory(getEditor().canvas);
render();

reportWebVitals();
