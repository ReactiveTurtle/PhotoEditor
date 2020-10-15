import {ImageD, Editor, Vector2, createNewCanvas } from "./index";
test('My first test', () => {
    const be: Editor = {
        selectedObject: null,
        canvas: new ImageD(100, 100)
    }
    be.canvas.data.fill(255);
    expect(createNewCanvas({
        selectedObject: null,
        canvas: null
    },
    {
        x: 100,
        y: 100
    })).toBe(be);
});
