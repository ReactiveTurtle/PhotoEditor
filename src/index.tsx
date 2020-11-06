import { createNewCanvas } from './helper/CanvasHelper';
import reportWebVitals from './reportWebVitals';
import { dispatch, render } from './statemanager/StateManager';
import { Vector2 } from './structures/Vector2';

dispatch(createNewCanvas, { x: 800, y: 600 } as Vector2, true);
render();

reportWebVitals();
