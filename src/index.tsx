import { getEditor, pushHistory, render, setEditor } from './model/StateManager'
import reportWebVitals from './reportWebVitals';
import { createNewCanvas } from './helpers/CanvasHelper';

setEditor(createNewCanvas(getEditor(), { x: 400, y: 600 }));
pushHistory(getEditor().canvas);
render();

reportWebVitals();
