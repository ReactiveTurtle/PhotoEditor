type Vector2 = {
  x: number;
  y: number;
};

type SelectedArea = {
  position: Vector2;
  size: Vector2;
};

type TextObject = {
  text: string;
  color: string;
  size: Vector2;
  position: Vector2;
};

type Triangle = {
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  size: Vector2;
  position: Vector2;
};

type Rectangle = {
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  size: Vector2;
  position: Vector2;
};

type Circle = {
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  radius: number;
  position: Vector2;
};

type Art = {
  image: ImageData;
  size: Vector2;
  position: Vector2;
};

type Editor = {
  selectedObject: TextObject | Triangle | Rectangle | Circle | Art;
  canvas: ImageData;
};

type ImageHistory = {
  history: Array<ImageData>;
  currentHistoryPosition: number;
};

enum Filter {
  Grey,
  Red,
  Green,
  Blue,
}

export {
  Vector2,
  SelectedArea,
  TextObject,
  Triangle,
  Rectangle,
  Circle,
  Art,
  Editor,
  ImageHistory,
};

function copyImageData(imageData: ImageData) {
  const newImageData: ImageData = new ImageData(
    imageData.width,
    imageData.height
  );
  newImageData.data.set(new Uint8ClampedArray(imageData.data));
  return newImageData;
}

function copySelectedObject(
  selectedObject: TextObject | Triangle | Rectangle | Circle | Art
) {
  let newSelectedObject: TextObject | Triangle | Rectangle | Circle | Art = {
    ...selectedObject,
    size: {
      ...(<TextObject | Triangle | Rectangle | Art>selectedObject).size,
    },
    position: {
      ...selectedObject.position,
    },
  };
  return newSelectedObject;
}

function createNewCanvas(editor: Editor, size: Vector2) {
  const newCanvas = new ImageData(size.x, size.y);
  newCanvas.data.fill(255);
  const newEditor: Editor = {
    ...editor,
    canvas: newCanvas,
  };
  return newEditor;
}

function editCanvasSize(editor: Editor, size: Vector2) {
  var imageData = new ImageData(size.x, size.y);
  imageData.data.fill(255);
  let minWidth = Math.min(size.x, editor.canvas.width);
  let minHeight = Math.min(size.y, editor.canvas.height);

  for (var i = 0; i < minHeight; i++) {
    for (var j = 0; i < minWidth; j++) {
      var dataIndex = (i * size.x + j) * 4;
      var canvasDataIndex = (i * editor.canvas.width + j) * 4;
      for (var k = 0; k < 4; k++) {
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

function selectArea(editor: Editor, selectedArea: SelectedArea) {
  var art: Art;
  art.position = selectedArea.position;
  art.size = selectedArea.size;
  var newCanvas = new ImageData(art.size.x, art.size.y);
  art.image = newCanvas;
  for (var i = 0; i < art.size.x; i++) {
    for (var j = 0; i < art.size.y; j++) {
      var dstIndex = (i * art.size.x + j) * 4;
      var srcIndex =
        ((i + art.position.y) * art.image.width + j + art.position.x) * 4;
      for (var k = 0; k < 4; k++) {
        art.image.data[dstIndex + k] = editor.canvas.data[srcIndex + k];
      }
      art.image.data[srcIndex + 3] = 0;
    }
  }
  const newEditor: Editor = {
    ...editor,
    selectedObject: art,
    canvas: newCanvas,
  };
  return newEditor;
}

function moveSelectedObject(editor: Editor, position: Vector2) {
  editor.selectedObject.position = position;

  const newEditor: Editor = {
    ...editor,
    selectedObject: {
      ...editor.selectedObject,
      position: position,
    },
  };
  return newEditor;
}

function cutSelectedArea(editor: Editor) {
  var art: Art;
  var selectedObject = editor.selectedObject;
  const newEditor: Editor = {
    ...editor,
    selectedObject: null,
  };
  if (typeof editor.selectedObject == typeof art) {
    selectedObject = <Art>selectedObject;
    newEditor.canvas = copyImageData(selectedObject.image);
  }
  return newEditor;
}

function replaceSelectedObject(
  history: ImageHistory,
  editor: Editor,
  newSelectedObject: TextObject | Triangle | Rectangle | Circle | Art
) {
  let newEditor: Editor = {
    ...editor,
    selectedObject: newSelectedObject,
  };
  if (editor.selectedObject != null) {
    newEditor = drawObject(editor, copySelectedObject(editor.selectedObject));
  }
  if (newSelectedObject != null) {
    history.history.push(copyImageData(editor.canvas));
    history.currentHistoryPosition++;
  }

  return newEditor;
}

function drawObject(
  editor: Editor,
  selectedObject: TextObject | Triangle | Rectangle | Circle | Art
) {
  let triangle: Triangle;
  let rectangle: Rectangle;
  let circle: Circle;
  let art: Art;
  let textObject: TextObject;

  var canvas = document.createElement("canvas");
  canvas.width = editor.canvas.width;
  canvas.height = editor.canvas.height;
  let newImageData: ImageData;

  switch (typeof selectedObject) {
    case typeof triangle:
      newImageData = drawTriangle(canvas, <Triangle>selectedObject);
      break;
    case typeof rectangle:
      newImageData = drawRectangle(canvas, <Rectangle>selectedObject);
      break;
    case typeof circle:
      newImageData = drawCircle(canvas, <Circle>selectedObject);
      break;
    case typeof art:
      newImageData = new ImageData(editor.canvas.width, editor.canvas.height);
      drawArt(newImageData, <Art>selectedObject);
      break;
    case typeof textObject:
      newImageData = drawText(canvas, <TextObject>selectedObject);
      break;
  }
  const newEditor: Editor = {
    ...editor,
    canvas: newImageData,
  };
  return newEditor;
}

function drawRectangle(
  canvas: HTMLCanvasElement,
  rectangle: Rectangle
): ImageData {
  var ctx = canvas.getContext("2d");
  let strokeWidth = rectangle.strokeWidth / 2;
  ctx.beginPath();
  ctx.moveTo(
    rectangle.position.x - strokeWidth,
    rectangle.position.y - strokeWidth
  );
  ctx.lineTo(
    rectangle.position.x + rectangle.size.x + strokeWidth,
    rectangle.position.y - strokeWidth
  );
  ctx.lineTo(
    rectangle.position.x + rectangle.size.x + strokeWidth,
    rectangle.position.y + rectangle.size.y + strokeWidth
  );
  ctx.lineTo(
    rectangle.position.x - strokeWidth,
    rectangle.position.y + rectangle.size.y + strokeWidth
  );
  ctx.strokeStyle = rectangle.strokeColor;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(rectangle.position.x, rectangle.position.y);
  ctx.lineTo(rectangle.position.x + rectangle.size.x, rectangle.position.y);
  ctx.lineTo(
    rectangle.position.x + rectangle.size.x,
    rectangle.position.y + rectangle.size.y
  );
  ctx.lineTo(rectangle.position.x, rectangle.position.y + rectangle.size.y);
  ctx.fillStyle = rectangle.fillColor;
  ctx.fill();
  return;
}

function drawTriangle(canvas: HTMLCanvasElement, triangle: Triangle) {
  var ctx = canvas.getContext("2d");
  let strokeWidth = triangle.strokeWidth / 2;
  ctx.beginPath();
  ctx.moveTo(
    triangle.position.x - strokeWidth,
    triangle.position.y - strokeWidth
  );
  ctx.lineTo(
    triangle.position.x + triangle.size.x + strokeWidth,
    triangle.position.y - strokeWidth
  );
  ctx.lineTo(
    triangle.position.x + triangle.size.x / 2,
    triangle.position.y + triangle.size.y + strokeWidth
  );
  ctx.strokeStyle = triangle.strokeColor;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(triangle.position.x, triangle.position.y);
  ctx.lineTo(triangle.position.x + triangle.size.x, triangle.position.y);
  ctx.lineTo(
    triangle.position.x + triangle.size.x / 2,
    triangle.position.y + triangle.size.y
  );
  ctx.fillStyle = triangle.fillColor;
  ctx.fill();
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawCircle(canvas: HTMLCanvasElement, circle: Circle) {
  var ctx = canvas.getContext("2d");
  let strokeWidth = circle.strokeWidth / 2;
  ctx.arc(
    circle.position.x,
    circle.position.y,
    circle.radius + strokeWidth,
    0,
    2 * Math.PI,
    false
  );
  ctx.strokeStyle = circle.strokeColor;
  ctx.stroke();

  ctx.arc(
    circle.position.x,
    circle.position.y,
    circle.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fillStyle = circle.fillColor;
  ctx.fill();
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawArt(canvas: ImageData, art: Art) {
  const newImageData = new ImageData(canvas.width, canvas.height);
  for (var i = 0; i < art.size.x; i++) {
    for (var j = 0; i < art.size.y; j++) {
      var dstIndex = (i * art.size.x + j) * 4;
      var srcIndex =
        ((i + art.position.y) * art.image.width + j + art.position.x) * 4;
      for (var k = 0; k < 4; k++) {
        newImageData.data[srcIndex + k] = art.image.data[dstIndex + k];
      }
    }
  }
  return newImageData;
}

function drawText(canvas: HTMLCanvasElement, text: TextObject) {
  var ctx = canvas.getContext("2d");
  ctx.font = `${text.size.y}px serif`;
  ctx.fillStyle = text.color;
  ctx.fillText(text.text, text.position.x, text.position.y, text.size.x);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function applyFilter(editor: Editor, filter: Filter) {
  const newImageData = new ImageData(editor.canvas.width, editor.canvas.height);
  switch (filter) {
    case Filter.Red | Filter.Green | Filter.Blue:
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
  }

  const newEditor: Editor = {
    ...editor,
    canvas: newImageData,
  };
  return newEditor;
}

function applyColorLevelFilter(src: ImageData, dst: ImageData, colorLevels: Array<number>) {
  for (var i = 0; i < dst.height; i++) {
    for (var j = 0; i < dst.width; j++) {
      var dataIndex = (i * dst.width + j) * 4;
      for (var k = 0; k < 4; k++) {
        dst[dataIndex + k] =
          src.data[dataIndex + k] * colorLevels[k];
      }
    }
  }
}

function applyGreyFilter(src: ImageData, dst: ImageData) {
  for (var i = 0; i < dst.height; i++) {
    for (var j = 0; i < dst.width; j++) {
      var dataIndex = (i * dst.width + j) * 4;
      var mean = (src.data[dataIndex] + src.data[dataIndex + 1] + src.data[dataIndex + 2]) / 3;
      for (var k = 0; k < 3; k++) {
        dst.data[dataIndex + k] = mean;
      }
    }
  }
}

function importObject(editor: Editor) {
  const newEditor: Editor = {
    ...editor,
  };
  document.querySelector("input").onchange = function (e: Event) {
    var inputElement = <HTMLInputElement>e.target;
    var file = inputElement.files[0],
      url = URL.createObjectURL(file),
      img = new Image();

    img.onload = function () {
      URL.revokeObjectURL(img.src);
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      newEditor.canvas = ctx.getImageData(0, 0, img.width, img.height);
    };
    img.src = url;
  };

  return newEditor;
}

function exportObject(editor: Editor) {
  var canvas = document.createElement("canvas");
  canvas.width = editor.canvas.width;
  canvas.height = editor.canvas.height;
  var ctx = canvas.getContext("2d");
  ctx.putImageData(editor.canvas, 0, 0);
  canvas.toBlob(
    function (blob) {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.setAttribute("download", url);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    },
    "image/jpeg",
    0.9
  );
  const newEditor: Editor = {
    ...editor,
  };
  return newEditor;
}

function undo(history: ImageHistory, editor: Editor) {
  const newEditor: Editor = {
    ...editor,
  };
  if (history.history.length > 0) {
    if (history.currentHistoryPosition > 0) {
      replaceSelectedObject(history, editor, null);
      history.currentHistoryPosition--;
      newEditor.canvas = copyImageData(
        history.history[history.currentHistoryPosition]
      );
    }
  }
  return editor;
}

function redo(history: ImageHistory, editor: Editor) {
  const newEditor: Editor = {
    ...editor,
  };
  if (history.history.length > 0) {
    if (history.currentHistoryPosition < history.history.length - 1) {
      history.currentHistoryPosition++;
      newEditor.canvas = copyImageData(
        history.history[history.currentHistoryPosition]
      );
    }
  }
  return newEditor;
}

export {
  createNewCanvas,
  editCanvasSize,
  selectArea,
  moveSelectedObject,
  cutSelectedArea,
  replaceSelectedObject,
  drawObject,
  applyFilter,
  importObject,
  exportObject,
  undo,
  redo,
};
