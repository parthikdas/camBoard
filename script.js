const board = document.getElementById('board'); // parent div for canvas and video
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clear = document.getElementById('clear'); // clear button
const strokeWidth = document.getElementById('strokeWidth'); // input type range
const strokeStyleColor = document.getElementById('strokeStyleColor'); // input type color 
const canvasBackgroundColor = document.getElementById('canvasBackgroundColor'); // input type color 
const eraser = document.getElementById('eraser'); // eraser checkbox
const view = document.getElementById('view'); // select tag for normal whiteboard or camboard
const video = document.createElement('video'); // new video element for catching cam feed
video.autoplay = true;

ctx.lineWidth = 10;
ctx.linecap = 'round';
ctx.strokeStyle = '#000';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let isErasing = false;
const eraserSize = 20;

let eraserButtonClicked = false;

let camOn = false;

// cursor is clicked on canvas
canvas.addEventListener('mousedown', (event) => {
    if(!eraserButtonClicked) {
        isDrawing = true;
        isErasing = false;
    } else {
        isDrawing = false;
        isErasing = true;
    }
    const {offsetX, offsetY} = event;
    lastX = offsetX;
    lastY = offsetY;
})

// cursor is moving on canvas
canvas.addEventListener('mousemove', (event) => {
    const {offsetX, offsetY} = event;
    if(isDrawing && !isErasing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        // update our locations
        lastX = offsetX;
        lastY = offsetY;
    } else if(!isDrawing && isErasing) {
        ctx.clearRect(parseInt(offsetX)-eraserSize, parseInt(offsetY)-eraserSize, eraserSize, eraserSize)
        // first 2 param is changed to make the eraser on top of cursor
    }
})

// cursor is released from clicked state
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    isErasing = false;
})

// cursor left the canvas
canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
    isErasing = false;
})

// clear whole screen
clear.addEventListener('click', (event) => {
    event.preventDefault();
    ctx.clearRect(0, 0, canvas.clientHeight, canvas.clientWidth);
})

// changing stroke width
strokeWidth.addEventListener('change', () => {
    ctx.lineWidth = strokeWidth.value
})

// changing color of brush
strokeStyleColor.addEventListener('change', () => {
    ctx.strokeStyle = strokeStyleColor.value
})

// changing color of canvas background
canvasBackgroundColor.addEventListener('change', () => {
    board.style.backgroundColor = canvasBackgroundColor.value
})

// eraser button clicked
eraser.addEventListener('click', () => {
    eraserButtonClicked = eraserButtonClicked ? false : true;
})

const videoStream = () => {
    navigator.mediaDevices.getUserMedia({ // getUserMedia is a API and takes an object as an argument 
        video: {width: 600, height: 600},
        audio: false // make it true if u also want audio
    })
    .then((stream) => { // and this returns a stream object which is a media stream object
        video.srcObject = stream // video source is stream
    })
}

const detectFaces = async () => { // this is function is asynchronus
    // const prediction = await model.estimateFaces(video, false) // 1st arg is input, 2nd is if we want to return tensor or not So her we dont want tensor we want actual values of coordinates
    //  ctx.drawImage(video, 0, 0, 600, 600) dont print it to canvas
    // a line to tell the limit
    console.log('hi');
    ctx.beginPath();
    ctx.lineWidth = '2'
    ctx.strokeStyle = 'red'
    ctx.moveTo(0, 60);
    ctx.lineTo(150, 60);
    ctx.stroke();

    // prediction.forEach(pred => { // pred corresponds to 1 face
    //     // plot nose point, its in landmark array
    //     ctx.fillStyle = 'yellow'
    //     ctx.fillRect(pred.landmarks[2][0], pred.landmarks[2][1], 5, 5)
    //     if(pred.landmarks[2][1] < 60) jump() // if limit touched jump
    // })
}

// let listener;

// changing to camera mode
view.addEventListener('change', () => {
    if(!camOn) { // turn cam on
        board.appendChild(video);
        videoStream();
        
    } else { // turn cam off
        // goal : remove the video child from board and close that navigator feed and end the set interval from eventlistenr of model and video
        board.removeChild(video);

        const stream = video.srcObject; // A video's MediaStream object is available through its srcObject attribute
        const tracks = stream.getTracks(); // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
        tracks[0].stop(); // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
        // tracks.forEach(track => track.stop()) // Or stop all like so:
    }
    camOn = view.value === 'CamBoard' ? true : false;
})

// video.addEventListener('loadeddata', async () =>{ // After the data is loaded then canvas is called, else it will not show
//     // model = await blazeface.load()
//     listener = setInterval(detectFaces, 40) // 1000/24frames = 40
// })