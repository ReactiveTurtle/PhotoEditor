import {Editor} from '../structures/Editor'
import {Vector2} from '../structures/Vector2'

export function copyImageData(imageData: ImageData) {
	const newImageData: ImageData = new ImageData(
		imageData.width,
		imageData.height
	);
	newImageData.data.set(new Uint8ClampedArray(imageData.data));
	return newImageData;
}

export function createNewCanvas(editor: Editor, size: Vector2): Editor {
	const newCanvas = new ImageData(size.x, size.y);
	newCanvas.data.fill(127);
	const newEditor: Editor = {
		...editor,
		canvas: newCanvas,
	};
	return newEditor;
}