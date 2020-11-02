import { getEditor, render, setEditor } from './statemanager/StateManager'
import reportWebVitals from './reportWebVitals';
import { createNewCanvas } from './helpers/CanvasHelper';

setEditor(createNewCanvas(getEditor(), { x: 400, y: 600 }));
render();

reportWebVitals();
