import { Polygon } from 'two.js';

class Particle {
  /**
   * Create a new particle
   * @param {String} type - one of ParticleScene.Types
   * @param {TwoInstance} stage 
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} radius 
   * @param {String} color 
   */
  constructor(type, stage, x, y, radius, color) {
    // Physics state held by the particle its self
    this.radius = radius;
    this.inertia = radius / 10;
    this.rotation = 0;
    this.x = x;
    this.y = y;

    // Create the particle shape and add to the instance
    this.shape = this._makeShape(type, stage, x, y, radius);
    
    // Reset back to basic a shape
    this.reset(color, radius);
  }

  reset(color='black', radius) {
    // this.shape.noStroke();
    this.shape.noFill();
    this.shape.stroke = color;
    this.shape.linewidth = Math.max(Math.round(radius/10), 3);
  }

  /**
   * Move this particle
   */
  move() {
    const dampen = 2;
    const wl = this.inertia > 15 ? this.inertia * 20 : this.radius * 1000;
    const amp = Math.min(this.radius / 5, 2);
    this.inertia += (this.radius / 3000) + (Math.random() * (this.radius / 2000));
    const newX = this.x + amp * Math.sin((this.y / wl) * Math.PI * 40);
    const newY = this.y - this.inertia / dampen;
    const newRotation = Math.sin(this.inertia / amp / 4) * Math.PI * 3;
    this._move(newX, newY, newRotation);
  }

  // Internal move function so that references can also be set
  _move(x, y, rotation) {
    this.shape.translation.set(x, y)
    this.shape.rotation = rotation;
    this.rotation = rotation;
    this.x = x;
    this.y = y;
  }

  // Internal shape maker so the particle can be one of many shapes
  _makeShape(type, stage, x, y, radius) {
    let shape;
    switch (type) {
      case 'circle':
        shape = stage.makeCircle(x, y, radius).center()
        break;
      case 'square':
        shape = stage.makeRectangle(x, y, radius, radius);
        break;
      case 'triangle':
        shape = new Polygon(x, y, radius, 3);
        stage.add(shape);
        break;
    }
    return shape;
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

  static get Types() { return ['circle', 'square'] };

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
   * @param {String} type - one of 'circle', 'square', 'triangle' 
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} size 
   */
  create(type, x, y, size=5, color) {
    const { stage } = this;
    const newParticle = new Particle(type, stage, x, y, size, color);
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

