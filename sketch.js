let particles = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 255); 

  
  for (let i = 0; i < 300; i++) {
    let x = random(width * 0.4, width * 0.6);
    let y = random(height * 0.6, height * 0.9);
    particles.push(new Particle(x, y));
  }
}

function draw() {
  background(20);

  for (let p of particles) {
    let windForce = createVector(0.05 * noise(p.pos.y * 0.01, frameCount * 0.01), 0);
    p.applyForce(windForce);
    p.applyWave();
    p.mouseInteraction();
    p.update();
    p.show();
    p.reappear();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.alpha = 255;
    this.size = random(2, 4);
  }

  applyForce(force) {
    this.acc.add(force);
  }
  
  applyWave() {
    let wave = sin(this.pos.x * 0.05 + frameCount * 0.1) * 0.5;
    this.acc.y += wave * 0.1;
  }

  mouseInteraction() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(this.pos, mouse);
    let distance = dir.mag();
    
    if (distance < 80) { 
      dir.setMag(0.5);
      this.applyForce(dir);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.mult(0.95);
    this.acc.mult(0);
    this.alpha -= 0.5;
  }

  reappear() {
    if (this.alpha <= 0 || this.pos.y < 0 || this.pos.y > height || this.pos.x < 0 || this.pos.x > width) {
      this.pos.set(random(width * 0.4, width * 0.6), random(height * 0.6, height * 0.9));
      this.vel.mult(0);
      this.alpha = 255;
    }
  }

  show() {
    noStroke();
    
    
    let hueValue = (this.pos.x + frameCount) % 360; 
    let particleColor = color(hueValue, 80, 100, this.alpha); 
    
    fill(particleColor);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
