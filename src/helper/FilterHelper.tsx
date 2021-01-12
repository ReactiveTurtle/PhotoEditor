import { Editor } from "../structures/Editor";
import { Filter } from "../structures/Filter";

export function applyFilter(editor: Editor, filter: Filter) {
	const newImageData = new ImageData(editor.canvas.width, editor.canvas.height);
	switch (filter) {
		case Filter.Red:
			applyColorLevelFilter(editor.canvas, newImageData, [1, 0, 0, 1]);
			break;
		case Filter.Green:
			applyColorLevelFilter(editor.canvas, newImageData, [0, 1, 0, 1]);
			break
		case Filter.Blue:
			applyColorLevelFilter(editor.canvas, newImageData, [0, 0, 1, 1]);
			break
		case Filter.Grey:
			applyGreyFilter(editor.canvas, newImageData);
			break;
		case Filter.Blur:
			applyBlurFilter(editor, newImageData);
			break;
	}

	const newEditor: Editor = {
		...editor,
		canvas: newImageData,
	};
	return newEditor;
}

function applyColorLevelFilter(src: ImageData, dst: ImageData, colorLevels: Array<number>) {
	for (var i = 0; i < dst.height; i++) {
		for (var j = 0; j < dst.width; j++) {
			var dataIndex = (i * dst.width + j) * 4;
			for (var k = 0; k < 4; k++) {
				dst.data[dataIndex + k] = src.data[dataIndex + k] * colorLevels[k];
			}
		}
	}
}

function applyGreyFilter(src: ImageData, dst: ImageData) {
	for (var i = 0; i < dst.height; i++) {
		for (var j = 0; j < dst.width; j++) {
			var dataIndex = (i * dst.width + j) * 4;
			var mean = (src.data[dataIndex] + src.data[dataIndex + 1] + src.data[dataIndex + 2]) / 3;
			for (var k = 0; k < 3; k++) {
				dst.data[dataIndex + k] = mean;
			}
			dst.data[dataIndex + 3] = src.data[dataIndex + 3];
		}
	}
}


export function applyBrightnessFilter(editor: Editor, brightnessFactor: number): Editor {
	const dst = new ImageData(editor.canvas.width, editor.canvas.height);
	const src = editor.canvas;
	for (var i = 0; i < dst.height; i++) {
		for (var j = 0; j < dst.width; j++) {
			var dataIndex = (i * dst.width + j) * 4;
			for (var k = 0; k < 3; k++) {
				dst.data[dataIndex + k] = src.data[dataIndex + k] * brightnessFactor;
			}
			dst.data[dataIndex + 3] = src.data[dataIndex + 3];
		}
	}
	const newEditor: Editor = {
		selectedObject: null,
		canvas: dst,
	};
	return newEditor;
}

export function applyBlurFilter(editor: Editor, imageData: ImageData): Editor {
	const data = editor.canvas;
	let px = data.data;
	let tmpPx = new Uint8ClampedArray(px.length);
	tmpPx.set(px);

	for (var i = 0, len = px.length; i < len; i++) {
		if (i % 4 === 3) { continue; }

		px[i] = (tmpPx[i]
			+ (tmpPx[i - 4] || tmpPx[i])
			+ (tmpPx[i + 4] || tmpPx[i])
			+ (tmpPx[i - 4 * data.width] || tmpPx[i])
			+ (tmpPx[i + 4 * data.width] || tmpPx[i])
			+ (tmpPx[i - 4 * data.width - 4] || tmpPx[i])
			+ (tmpPx[i + 4 * data.width + 4] || tmpPx[i])
			+ (tmpPx[i + 4 * data.width - 4] || tmpPx[i])
			+ (tmpPx[i - 4 * data.width + 4] || tmpPx[i])
		) / 9;
	};
	imageData.data.set(px);
	const newEditor: Editor = {
		selectedObject: null,
		canvas: imageData,
	};
	return newEditor;
}
