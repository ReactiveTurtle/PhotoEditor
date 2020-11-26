import { Art } from '../structures/Art';
import { Editor } from '../structures/Editor'
import { SelectedArea } from '../structures/SelectedArea';
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

export function editCanvasSize(editor: Editor, size: Vector2): Editor {
	let imageData = new ImageData(size.x, size.y);
	imageData.data.fill(255);
	let minWidth = Math.min(size.x, editor.canvas.width);
	let minHeight = Math.min(size.y, editor.canvas.height);

	for (let i = 0; i < minHeight; i++) {
		for (let j = 0; j < minWidth; j++) {
			let dataIndex = (i * size.x + j) * 4;
			let canvasDataIndex = (i * editor.canvas.width + j) * 4;
			for (let k = 0; k < 4; k++) {
				imageData.data[dataIndex + k] = editor.canvas.data[canvasDataIndex + k];
			}
		}
	}
	const newEditor: Editor = {
		...editor,
		canvas: imageData,
	};
	return newEditor;
}

export function cutSelectedArea(editor: Editor) {
	var newCanvas = copyImageData((editor.selectedObject as Art).image);
	const newEditor: Editor = {
		canvas: newCanvas,
		selectedObject: null,
	};
	return newEditor;
}

export function selectArea(editor: Editor, selectedArea: SelectedArea): Editor {
	let art: Art = {
		type: Types.Art,
		image: new ImageData(selectedArea.size.x, selectedArea.size.y),
		position: selectedArea.position,
		size: selectedArea.size,
	};
	const newCanvas = copyImageData(editor.canvas);
	for (let i = 0; i < art.size.y; i++) {
		for (let j = 0; j < art.size.x; j++) {
			let dstIndex = (i * art.size.x + j) * 4;
			let srcIndex =
				((i + art.position.y) * newCanvas.width + j + art.position.x) * 4;
			for (let k = 0; k < 4; k++) {
				art.image.data[dstIndex + k] = editor.canvas.data[srcIndex + k];
			}
			newCanvas.data[srcIndex + 3] = 0;
		}
	}
	const newEditor: Editor = {
		...editor,
		selectedObject: art,
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
