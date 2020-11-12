import { Art } from '../structures/Art';
import { Editor } from '../structures/Editor'
import { Types } from '../structures/Type';
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

export function importObject(callback: Function): void {
	if (document !== null) {
		const input = document.createElement("input") as HTMLInputElement;
		input.type = "file";
		input.click();
		if (input !== null) {
			input.onchange = function (e: Event) {
				const inputElement = e.target as HTMLInputElement;
				if (inputElement.files != null) {
					var file = inputElement.files[0];
					const url = URL.createObjectURL(file),
						img = new Image();

					img.onload = function () {
						URL.revokeObjectURL(img.src);
						const canvas = document.createElement("canvas");
						canvas.width = img.width;
						canvas.height = img.height;
						const ctx = canvas.getContext("2d");
						if (ctx !== null) {
							ctx.drawImage(img, 0, 0);
							const art: Art = {
								type: Types.Art,
								image: ctx.getImageData(0, 0, img.width, img.height),
								position: {
									x: 0,
									y: 0
								},
								size: {
									x: img.width,
									y: img.height
								}
							}
							callback(art);
						}
						canvas.remove();
					};
					img.src = url;
				}
			};
		}
	}
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
