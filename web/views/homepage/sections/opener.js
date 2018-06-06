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

    const nextFrame = () => requestAnimationFrame(() => draw());
     
    if (particles.length > 5) {
      return nextFrame();
    }

    particles.create(particles.stage.width/2, particles.stage.height/2, 5);
    
    particles.update();
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