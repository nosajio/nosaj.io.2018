class Particle {
  constructor(stage, x, y, radius) {
    this.shape = stage.makeCircle(x, y, radius);
    this.reset();
  }

  reset() {
    this.shape.noStroke();
    this.shape.fill = 'white';
  }
}

export class ParticleScene {
  constructor(stage) {
    this.stage = stage;
    this.particles = [];
  }

  get length() {
    return this.particles.length;
  }

  each(cb) {
    for (let i = 0; i < this.particles.length; i++) {
      cb(this.particles[i]);
    }
  }

  create(x, y, size=5) {
    const { stage } = this;
    const newParticle = new Particle(stage, x, y, size);
    this.particles.push(newParticle);
  }

  // Commit all the changes to the stage
  update() {
    this.stage.update();
  }
}

