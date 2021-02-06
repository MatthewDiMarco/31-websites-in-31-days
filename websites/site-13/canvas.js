/**
 * Good tutorial:
 * https://www.youtube.com/watch?v=3GqUM4mEYKA (Dev Ed)
 * 
 * issues:
 * - resizing window (and thus canvas) deletes drawings
 */

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const pencil = document.getElementById('pencil');
const pen = document.getElementById('pen');
const eraser = document.getElementById('eraser');
const colorPicker = document.getElementById('favcolor');

let drawing = false;
let erasing = false; 
let eraserThickness = 50;
let penThickness = 10;
let penColor = 'red';

function startPosition(e) {
  drawing = true;
  draw(e);
}

function finishedPosition() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = penThickness;
  ctx.strokeStyle = penColor;
  ctx.lineCap = 'round';
  if (erasing) {
    ctx.clearRect(
      e.clientX - eraserThickness/2, 
      e.clientY - eraserThickness/2, 
      eraserThickness, eraserThickness
    );
  } else {
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
}

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight-4;
}

function resetButtons() {
  pencil.style.borderColor = 'rgb(100, 100, 100)';
  pen.style.borderColor = 'rgb(100, 100, 100)';
  eraser.style.borderColor = 'rgb(100, 100, 100)';
}

window.addEventListener('resize', resize);
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
pencil.addEventListener('click', e => {
  resetButtons();
  pencil.style.borderColor = 'red';
  penThickness = 10;
  erasing = false;
});
pen.addEventListener('click', e => {
  resetButtons();
  pen.style.borderColor = 'red';
  penThickness = 2;
  erasing = false;
});
eraser.addEventListener('click', e => {
  resetButtons();
  eraser.style.borderColor = 'red';
  erasing = true;
});
colorPicker.addEventListener('change', e => {
  penColor = e.target.value; 
});

resize();