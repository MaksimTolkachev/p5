let size = 1000;
let seed = fxrand() * 1000000000;

let angle = 0;
let x = 100;
let y = 100;
let stepSize = 0;
let powerTurning = 0.2;
let arrayDots = [];

function preload() {
  randomSeed(seed);
  noiseSeed(seed);
}

function Dot(x, y, angle, stepSize, powerTurning, color) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.stepSize = stepSize;
  this.powerTurning = powerTurning;
  this.color = color;
  this.isPoint = random([true, false]);
}

function setup() {
  size = size || Math.min(windowWidth, windowHeight);
  createCanvas(size, size);
  // fxpreview()
  let a = random(0, 35);
  let b = random(100, 210);
  colorMode(HSB, 255);
  for (let i = 0; i < 400; i++) {
    dot = new Dot(random(width), random(height), random(0, 2 * PI), stepSize, powerTurning, [random([a, b]), random(255), random(200)]);
    arrayDots.push(dot);
    if (dot.isPoint) {
      dot.stepSize = random(15, 20);
    } else {
      dot.stepSize = random(5, 9);
    }
  }
}

function draw() {
  arrayDots.forEach((dot) => {
    strokeWeight(3);
    stroke(dot.color[0], dot.color[1], dot.color[2]);
    newX = dot.x + cos(dot.angle) * dot.stepSize;
    newY = dot.y + sin(dot.angle) * dot.stepSize;
    if (dot.isPoint) {
      point(dot.x, dot.y);
      dot.angle += random(-1, 1) * dot.powerTurning;
    } else {
      dot.angle += random(-4, 5) * dot.powerTurning;
      line(newX, newY, dot.x, dot.y);
    }
    dot.x = newX;
    dot.y = newY;

    if (dot.x > width) {
      dot.x = width;
      dot.angle = dot.angle + PI;
    }
    if (dot.x < 0) {
      dot.x = 0;
      dot.angle = dot.angle + PI;
    }
    if (dot.y > height) {
      dot.y = height;
      dot.angle = dot.angle + PI;
    }
    if (dot.y < 0) {
      dot.y = 0;
      dot.angle = dot.angle + PI;
    }
    if (frameCount > 100) {
      arrayDots = [];
    }
  });
}
