import runOpener from './opener/opener';
import ProjectsGallery from './projects-gallery/projects-gallery';
import { el } from 'utils/helpers';

const initProjectsGallery = () => {
  const galleryElement = el('.projects-gallery__content');
  const gallery = new ProjectsGallery(galleryElement);

  gallery.on('change', e => {
    // Play appropriate video when landing on slide
    const slideVideo = e.element.querySelector('video');
    if (slideVideo) {
      slideVideo.play();
    }
  });

  gallery.on('touch', e => {
    // Pause all videos on slide interaction
    const videos = Array.from(e.slides).map(slide => slide.querySelector('video'));
    if (videos.length) {
      videos.forEach(v => v && v.pause());
    }
  });
}

const initHomepage = () => {
  runOpener();
  initProjectsGallery();
}

initHomepage()