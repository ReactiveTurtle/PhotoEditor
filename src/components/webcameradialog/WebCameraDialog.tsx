import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import ReactiveDialog from "../reactivedialog/ReactiveDialog";
import { openWebCamera, takeSnapshot } from './WebCameraHelper';
import styles from "./WebCameraDialog.module.css"
import { Art } from '../../structures/Art';
import { Types } from '../../structures/Type';

interface WebCameraDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onResult: (art: Art) => void;
}

export default function WebCameraDialog(props: WebCameraDialogProps) {
    const [video, setVideo] = useState<HTMLVideoElement | null>(null);
    const [streaming, setStreaming] = useState<boolean>(false);
    const [photo, setPhoto] = useState<ImageData | null>(null);

    const handleResult = (photo: ImageData) => {
        props.onResult({
            type: Types.Art,
            image: photo,
            position: { x: 0, y: 0 },
            size: { x: photo.width, y: photo.height },
            rotation: 0
        });
        handleClose();
    }

    const handleSnapshot = () => {
        if (photo !== null) {
            setPhoto(null);
        } else if (video !== null) {
            setStreaming(false);
            setPhoto(takeSnapshot(video));
        }
    }

    const handleClose = () => {
        props.onClose();
        setStreaming(false);
    }

    const handleVideoLoaded = (video: HTMLVideoElement) => {
        if (props.isOpen && !streaming) {
            openWebCamera(video);
            setStreaming(true);
            setVideo(video);
        }
    }
    return (
        <ReactiveDialog
            paperStyle={{ width: "fit-content", maxWidth: "fit-content" }}
            isOpen={props.isOpen}
            title="Веб-камера"
            onClose={handleClose}
            actions={() => {
                return (
                    <div>
                        <Button autoFocus onClick={() => handleSnapshot()} color="secondary">
                            {photo === null ? "Захват" : "Повтор"}
                        </Button>
                        <Button autoFocus
                            onClick={() => {
                                if (photo !== null) handleResult(photo)
                            }}
                            color="secondary">
                            Далее
                        </Button>
                    </div>
                );
            }}>
            {photo === null &&
                <video
                    className={styles.mediaContainer}
                    autoPlay
                    ref={(video) => {
                        if (video !== null) {
                            handleVideoLoaded(video);
                        }
                    }} />}
            {photo !== null &&
                <canvas
                    className={styles.mediaContainer}
                    ref={(canvas) => {
                        if (canvas !== null) {
                            const ctx = canvas.getContext("2d");
                            if (ctx !== null) {
                                ctx.putImageData(photo, 0, 0)
                            }
                        }
                    }}
                    width={photo.width}
                    height={photo.height} />}
        </ReactiveDialog>
    )
}