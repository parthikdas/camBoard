const canvas = document.getElementById('canvas');
const clear = document.getElementById('clear');
const strokeWidth = document.getElementById('strokeWidth');
const strokeStyleColor = document.getElementById('strokeStyleColor');
const canvasBackgroundColor = document.getElementById('canvasBackgroundColor');
const eraser = document.getElementById('eraser');
const view = document.getElementById('view');
const ctx = canvas.getContext('2d');

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
    document.getElementById('board').style.backgroundColor = canvasBackgroundColor.value
})

// eraser button clicked
eraser.addEventListener('click', () => {
    eraserButtonClicked = eraserButtonClicked ? false : true;
})

// changing to camera mode
view.addEventListener('change', () => {
    camOn = view.value === 'CamBoard' ? true : false;
})