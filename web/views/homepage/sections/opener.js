import Two from 'two.js';
import { ParticleScene } from './particles';

// Util
const el = el => document.querySelector(el);
const randomIndex = arr => arr[Math.round(Math.random() * (arr.length - 1))]

const init = () => {
  const stageEl = el('.opener-art');

  // Setup the Two.js scene
  const stageBoundingClientRect = stageEl.getBoundingClientRect();
  const stage = new Two({
    width: stageBoundingClientRect.width,
    height: stageBoundingClientRect.height,
    type: Two.Types.canvas,
  });
  stage.appendTo(stageEl);
  return stage;
}

const driftingBubbles = particles => {
  const maxShapes = 15;
  const clrs = ['#bbb', '#444', '#777', '#555'];

  const types = ParticleScene.Types;
  
  const draw = () => {
    
    // Update the particle scene instance and then call requestAnimFrame...
    const nextFrame = () => {
      particles.update();
      requestAnimationFrame(() => draw())
    }
    
    // This moves all particles in the scene by calling their own 'move' methods
    particles.move();
    
    // Advance to the next frame early when there are already enough 
    // shapes in scene
    if (particles.length >= maxShapes) {
      return nextFrame();
    }
    
    // Configure the new shape and then make it
    const size          = Math.max(Math.random() * 50, 10);
    const offsetY       = Math.random() * 100 + size;
    const particleX     = Math.random() * particles.stage.width;
    const particleY     = particles.stage.height + offsetY;
    const shapeType     = randomIndex(types);
    const particleColor = randomIndex(clrs);
    
    particles.create(shapeType, particleX, particleY, size, particleColor);

    // Advance to the next frame
    nextFrame();
  }
  draw();
}

const opener = () => {
  const stage = init();
  const particles = new ParticleScene(stage);
  driftingBubbles(particles);
}

export default opener