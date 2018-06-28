import runOpener from './opener/opener';
import ProjectsGallery from './projects-gallery/projects-gallery';
import { el } from 'utils/helpers';

let debounceTimer;
const debounce = ms => new Promise(resolve => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => resolve(), ms);
});

const playSlideVideos = slides => {
  const videos = Array.from(slides).map(slide => slide.querySelector('video'));
  if (videos.length) {
    videos.forEach(v => v && v.play());
  }
}

const pauseSlideVideos = slides => {
  const videos = Array.from(slides).map(slide => slide.querySelector('video'));
  if (videos.length) {
    videos.forEach(v => v && v.pause());
  }
}

const initProjectsGallery = () => {
  const galleryElement = el('.projects-gallery__content');
  const gallery = new ProjectsGallery(galleryElement);

  gallery.on('change', e => {
    // Play in-view video video when landing on slide
    playSlideVideos([e.element]);
  });

  gallery.on('touch', e => {
    // Pause all videos on slide interaction
    pauseSlideVideos(e.slides);
  });

  // Autoplay the first slide's video when it's in view
  window.addEventListener('scroll', e => {
    debounce(400).then(() => {
      const offset = window.innerHeight / 2;
      const scrollTop = galleryElement.getBoundingClientRect().top;
      const scrollCenter = scrollTop - offset;
      if (scrollCenter > 0) {
        return;
      } 
      playSlideVideos([galleryElement.children[0]]);
    }, false);
  });
}

const initHomepage = () => {
  runOpener();
  initProjectsGallery();
}

initHomepage()