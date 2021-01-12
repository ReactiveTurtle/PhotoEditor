import { Art } from '../structures/Art';
import { Editor } from '../structures/Editor'
import { ExportFormat, formatToString } from '../structures/ExportFormat';
import { SelectedArea } from '../structures/SelectedArea';
import { Types } from '../structures/Type';
import { Vector2 } from '../structures/Vector2'

export function scaleImageData(imageData: ImageData, newSize: Vector2) {
	const canvas = document.createElement("canvas");
	canvas.width = imageData.width;
	canvas.height = imageData.height;
	const ctx = canvas.getContext("2d");
	if (ctx === null) {
		throw new Error();
	}
	ctx.putImageData(imageData, 0, 0);
	const dstCanvas = document.createElement("canvas");
	dstCanvas.width = newSize.x;
	dstCanvas.height = newSize.y;
	const dstCtx = canvas.getContext("2d");
	if (dstCtx === null) {
		throw new Error();
	}
	dstCtx.scale(newSize.x / imageData.width, newSize.y / imageData.height)
	dstCtx.drawImage(canvas, 0, 0);
	return dstCtx.getImageData(0, 0, newSize.x, newSize.y);
}

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
		position: {
			x: Math.round(selectedArea.position.x),
			y: Math.round(selectedArea.position.y)
		},
		size: {
			x: Math.round(selectedArea.size.x),
			y: Math.round(selectedArea.size.y)
		},
		rotation: 0
	};
	const newCanvas = copyImageData(editor.canvas);
	for (let i = 0; i < art.size.y; i++) {
		const dstY = i * art.size.x;
		const srcY = (i + art.position.y) * newCanvas.width;
		for (let j = 0; j < art.size.x; j++) {
			let dstIndex = (dstY + j) * 4;
			let srcIndex =
				(srcY + j + art.position.x) * 4;
			for (let k = 0; k < 4; k++) {
				art.image.data[dstIndex + k] = newCanvas.data[srcIndex + k];
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

export function importImageUrl(url: string, onResult: (art: Art) => void, onProgress?: (percentage: number) => void) {
	const request = new XMLHttpRequest();
	if (onProgress !== undefined) {
		request.onprogress = function (e) {
			onProgress((e.loaded / e.total) * 100);
		};
	}
	request.onload = function () {
		const img = new Image();
		var blob = new Blob([this.response]);
		img.onload = () => {
			URL.revokeObjectURL(img.src);
			const canvas = document.createElement("canvas");
			canvas.width = img.clientWidth;
			canvas.height = img.clientHeight;
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
					},
					rotation: 0,
				}
				onResult(art);
			}
			canvas.remove();
			img.remove();
		}
		img.src = window.URL.createObjectURL(blob);
		document.body.appendChild(img);
	};
	request.responseType = 'arraybuffer';
	request.overrideMimeType('text/plain; charset=x-user-defined');
	request.open('GET', url, true);
	request.send();
}

export function importObject(onResult: (art: Art) => void, onProgress?: (percentage: number) => void): void {
	if (document !== null) {
		const input = document.createElement("input") as HTMLInputElement;
		input.type = "file";
		input.click();
		if (input !== null) {
			input.onchange = function (e: Event) {
				const inputElement = e.target as HTMLInputElement;
				if (inputElement.files != null) {
					var file = inputElement.files[0];
					const url = URL.createObjectURL(file);
					importImageUrl(url, onResult, onProgress);
				}
			};
		}
	}
}

export function exportObject(imageData: ImageData, format: ExportFormat, quality: number) {
	const formatString = formatToString(format);
	var canvas = document.createElement("canvas");
	canvas.width = imageData.width;
	canvas.height = imageData.height;
	if (canvas == null) {
		return;
	}
	const ctx = canvas.getContext("2d");
	if (ctx == null) {
		return;
	}
	ctx.putImageData(imageData, 0, 0);
	canvas.toBlob(
		function (blob) {
			if (blob == null) {
				return;
			}
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `image.${formatString}`);
			document.body.appendChild(link);
			link.click();
			link.remove();
			canvas.remove();
		},
		`image/${formatString}`,
		quality / 100
	);
}
