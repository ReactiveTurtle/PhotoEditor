import React from 'react';
import { Editor } from '../structures/Editor';
import './Canvas.css';

interface CanvasProps {
    editor: Editor
}

function Canvas(props: CanvasProps) {
    return (
        <div className="Canvas-container">
            <canvas ref={(c) => {
                const context = c?.getContext("2d");
                if (context != null) {
                    context.putImageData(props.editor.canvas, 0, 0);
                }
            }}
                id="canvas"
                className="Canvas"
                width={props.editor.canvas.width}
                height={props.editor.canvas.height}>
            </canvas>
        </div>
    );
}

export default Canvas;
