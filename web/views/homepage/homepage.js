import runOpener from './opener/opener';
import ProjectsGallery from './projects-gallery/projects-gallery';
import { el } from 'utils/helpers';

const initProjectsGallery = () => {
  const galleryElement = el('.projects-gallery__content');
  const gallery = new ProjectsGallery(galleryElement);
}

const initHomepage = () => {
  runOpener();
  initProjectsGallery();
}

initHomepage()