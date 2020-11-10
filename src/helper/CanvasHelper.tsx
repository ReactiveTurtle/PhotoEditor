import { Art } from '../structures/Art';
import { Editor } from '../structures/Editor'
import { Point } from '../structures/Polygon';
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
				var inputElement = e.target as HTMLInputElement;
				if (inputElement.files != null) {
					var file = inputElement.files[0];
					const url = URL.createObjectURL(file),
						img = new Image();

					img.onload = function () {
						URL.revokeObjectURL(img.src);
						var canvas = document.createElement("canvas");
						canvas.width = img.width;
						canvas.height = img.height;
						var ctx = canvas.getContext("2d");
						if (ctx !== null) {
							ctx.drawImage(img, 0, 0);
							const art: Art = {
								type: Types.Art,
								image: ctx.getImageData(0, 0, img.width, img.height),
								polygon: {
									type: Types.Polygon,
									control: {
										resizeAdjacentPoints: false,
										lockChangeRadius: false
									},
									firstPoint: null,
									fillColor: "#000",
									strokeColor: "#000",
									strokeWidth: 0,
									position: {
										x: 0,
										y: 0
									}
								}
							}
							const points: Vector2[] = [
								{ x: 0, y: 0 },
								{ x: art.image.width, y: 0 },
								{ x: art.image.width, y: art.image.height },
								{ x: 0, y: art.image.height }]
							let firstPoint: Point | null = null;
							let point: Point | null = null;
							for (let i = 0; i < points.length; i++) {
								const item = points[i];
								const newPoint: Point = {
									parent: art.polygon,
									x: item.x,
									y: item.y,
									radius: 0,
									previous: point,
									next: null
								}
								if (point !== null) {
									point.next = newPoint;
								}
								if (i === 0) {
									firstPoint = newPoint;
								}
								point = newPoint;
							}
							if (firstPoint != null && point != null) {
								firstPoint.previous = {
									parent: art.polygon,
									x: art.image.width / 2 - 8,
									y: art.image.height / 2 + 8,
									radius: 0,
									previous: point,
									next: firstPoint,
								};
								point.next = firstPoint.previous;
							}
							art.polygon.firstPoint = firstPoint;

							console.log(art);
							callback(art);
						}
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
