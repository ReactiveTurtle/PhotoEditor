
export function openWebCamera(video: HTMLVideoElement) {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(function (stream) {
        video.srcObject = stream;
        video.play();
    }).catch(function (err) {
        console.log("An error occurred: " + err);
    });;
}

export function takeSnapshot(video: HTMLVideoElement): ImageData {
    const width = video.videoWidth;
    const height = video.videoHeight;
    const htmlCanvas = document.createElement("canvas");
    htmlCanvas.width = width;
    htmlCanvas.height = height;
    const ctx = htmlCanvas.getContext("2d");
    if (ctx === null) {
        throw new Error();
    }
    ctx.drawImage(video, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height);
}
