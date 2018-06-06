class Particle {
  /**
   * Create a new particls
   * @param {TwoInstance} stage 
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} radius 
   * @param {String} color 
   */
  constructor(stage, x, y, radius, color) {
    // Create the particle shape and add to the instance
    this.shape = stage.makeCircle(x, y, radius).center();

    // Physics state held by the particle its self
    this.radius = radius;
    this.inertia = radius;
    this.x = x;
    this.y = y;
    
    // Reset back to basic a shape
    this.reset(color);
  }

  reset(color='white') {
    this.shape.noStroke();
    this.shape.fill = color;
  }

  /**
   * Move this particle
   * @param {Number} drift lateral movement quantifier
   */
  move(drift=0) {
    const wl = this.inertia * 10;
    const amp = Math.min(this.radius * 2, 10);
    const newX = this.x + amp * Math.cos(this.y/wl);
    const newY = this.y - this.inertia;
    this.inertia += this.radius/15;
    this._move(newX, newY);
  }

  // Internal move function so that references can also be set
  _move(x, y) {
    this.shape.translation.set(x, y)
    this.x = x;
    this.y = y;
  }
}



export class ParticleScene {
  /**
   * Create a new particle scene
   * @param {TwoInstance} stage 
   */
  constructor(stage) {
    this.stage = stage;
    this.lateralInertia = Math.random() * 2;
    this.particles = [];
  }

  /**
   * Retruns the number of particles currently in scene
   */
  get length() {
    return this.particles.length;
  }

  /**
   * Enumberate over particles in scene
   * @param {function} cb 
   */
  each(cb) {
    for (let i = 0; i < this.length; i++) {
      cb(this.particles[i], i);
    }
  }

  /**
   * Create a new particle and add it to the scene
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} size 
   */
  create(x, y, size=5) {
    const { stage } = this;
    const newParticle = new Particle(stage, x, y, size);
    this.particles.push(newParticle);
  }

  /**
   * Remove a particle from scene
   * @param {Number} index 
   */
  remove(index) {
    this.particles.splice(index, 1);
  }

  /**
   * Moves all particles one step by calling their internal move func
   */
  move() {
    this.each(node => {
      node.move();
    });
  }

  /**
   * Commit all the changes to the stage. Basically just a wrapper around two's
   * update method, with some additional garbage collection.
   */
  update() {
    this.stage.update();
    this._garbageCollect();
  }

  // Clean up off screen particles
  _garbageCollect() {
    this.each((node, index) => {
      if (node.y < 0) {
        this.remove(index)
        this.stage.remove(node.shape);
      }
    });
  }
}

