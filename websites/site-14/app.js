/**
 * Credit for tutorial
 * https://www.youtube.com/watch?v=j_BgnpMPxzM
 */

// Init
const SHRINK = 0.1;
const NUM_PARTICLES = 100;
const canvas = document.getElementById('mycanvas');
console.log(canvas);
const ctx = canvas.getContext('2d');
let particleArray = []; 

// Mouse position
const mouse = {
  x: null,
  y: null
}
window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y
});
setInterval(e => {
  mouse.x = undefined;
  mouse.y = undefined;
}, 200);

// Class to represent particles
class Particle {
  constructor(x, y, size, col, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = col;
    this.weight = weight;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.size -= SHRINK;
    if (this.size < 0) {
      this.x = (mouse.x + ((Math.random() * 20) - 10));
      this.y = (mouse.y + ((Math.random() * 20) - 10));
      this.size = (Math.random() * 10) + 2;
      this.weight = (Math.random() * 2) - 0.5;
    }
    this.y += this.weight;
    this.weight += 0.1;

    if (this.y > canvas.height - this.size) {
      this.weight *= -0.2;
    }
  }
}

function init() {
  particleArray = [];
  for (ii = 0; ii < NUM_PARTICLES; ii++) {
    particleArray.push(new Particle(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      (Math.random() * 5) + 2,
      'white', 0.1
    ));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (ii = 0; ii < particleArray.length; ii++) {
    particleArray[ii].update();
    particleArray[ii].draw();
    console.log('hit');
  }
  requestAnimationFrame(animate);
}

// Update canvas on resize
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);

// Start
resize();
init();
animate();