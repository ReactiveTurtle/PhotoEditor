import { Editor } from '../structures/Editor'
import { Vector2 } from '../structures/Vector2'

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
	newCanvas.data.fill(255);
	const newEditor: Editor = {
		...editor,
		selectedObject: null,
		canvas: newCanvas,
	};
	return newEditor;
}

export function exportObject() {
	var canvas = document.getElementById("canvas") as HTMLCanvasElement;
	if (canvas == null) {
		return;
	}
	canvas.toBlob(
		function (blob) {
			if (blob == null) {
				return;
			}
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "image.png");
			document.body.appendChild(link);
			link.click();
			link.remove();
		},
		"image/png",
		0.9
	);
}
