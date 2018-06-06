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
  let frame = 1;
  const draw = () => {
    frame++;

    const nextFrame = () => {
      particles.update();
      requestAnimationFrame(() => draw())
    }

    particles.move();    
    
    if (particles.length >= 15) {
      return nextFrame();
    }
    
    const size = Math.max(Math.random() * 10, 3);
    particles.create(Math.random() * particles.stage.width, particles.stage.height + size, size);

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