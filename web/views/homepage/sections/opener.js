import Two from 'two.js';
import { ParticleScene } from './particles';

const el = el => document.querySelector(el);

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
  let frame = 1;
  const clrs = ['#ccc', '#ddd', '#fff', '#555'];
  // const clrs = ['#FCFAF4', '#FFEFBF', '#D1E8F9', '#F7ADAD'];
  const draw = () => {
    const particlesColor = clrs[Math.round(Math.random() * (clrs.length - 1))];
    frame++;

    const nextFrame = () => {
      particles.update();
      requestAnimationFrame(() => draw())
    }

    particles.move();    
    
    if (particles.length >= maxShapes) {
      return nextFrame();
    }
    
    const types = ['circle', 'square', 'triangle'];
    const size = Math.max(Math.random() * 50, 10);
    const particleX = Math.random() * particles.stage.width;
    const particleY = particles.stage.height + size;
    const shapeType = types[Math.round(Math.random() * (types.length - 1))];
    
    particles.create(shapeType, particleX, particleY, size, particlesColor);

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