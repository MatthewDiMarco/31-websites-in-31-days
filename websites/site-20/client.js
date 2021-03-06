// Canvas
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const decayBar = document.getElementById('decay-input');
const bounceBar = document.getElementById('bounce-input');
const fallBar = document.getElementById('fallspd-input');
const sizeBar = document.getElementById('size-input');

// Particle Properties
let MIN_SIZE, MAX_SIZE, DECAY_SPD, BOUNCE, FALL_SPD, MAX_START_WEIGHT = 5;

// Control Panel Listeners
function updateDecay() {
  DECAY_SPD = decayBar.value/1000;
}
function updateBounce() {
  BOUNCE = bounceBar.value/100;
}
function updateFallSpd() {
  FALL_SPD = fallBar.value/100;
}
function updateSize() {
  MIN_SIZE = sizeBar.value/10;
  MAX_SIZE = MIN_SIZE + 5;
}

decayBar.addEventListener('change', updateDecay);
bounceBar.addEventListener('change', updateBounce);
fallBar.addEventListener('change', updateFallSpd);
sizeBar.addEventListener('change', updateSize);

// Env Properties
const NUM_PARTICLES = 100;
let particleArray = []; 
let SPAWN_RADIUS = canvas.width;

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
    this.size -= DECAY_SPD;
    if (this.size < 0) {
      this.x = (((Math.random() * SPAWN_RADIUS)));
      this.y = (Math.random() * 10) - 5;
      this.size = Math.random() * (MAX_SIZE + MIN_SIZE) + MIN_SIZE;
      this.weight = (Math.random() * MAX_START_WEIGHT);
    }
    this.y += this.weight;
    this.weight += FALL_SPD;

    if (this.y > canvas.height - this.size) {
      this.weight *= -BOUNCE;
    }
  }
}

function init() {
  particleArray = [];
  for (ii = 0; ii < NUM_PARTICLES; ii++) {
    particleArray.push(
      new Particle(
        (Math.random() * canvas.width),
        (Math.random() * canvas.height),
        (Math.random() * (MAX_SIZE + MIN_SIZE) + MIN_SIZE),
        'lightblue', 0.1
      )
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (ii = 0; ii < particleArray.length; ii++) {
    particleArray[ii].update();
    particleArray[ii].draw();
  }
  requestAnimationFrame(animate);
}

// Update canvas on resize
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  SPAWN_RADIUS = canvas.width;
}
window.addEventListener('resize', resize);

// Start
updateDecay();
updateBounce();
updateFallSpd();
updateSize();

resize();
init();
animate();