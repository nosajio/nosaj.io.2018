import runOpener from './opener/opener';
import { el, debounce } from 'utils/helpers';
import { initProjectVideos } from './projects/projects';

/**
 * Determine if the video is currently in view
 * @param {Object} v The video object returned by initProjectVideos
 */
const isVideoInView = v => {
  // Calculate the 'safe area' that the video will play in
  const playOffset = 2; // Fraction of the screen the video must be in before it plays
  const windowHeight = window.innerHeight / playOffset;
  // Check if video is in the safe area
  const videoOffset = v.parent.getBoundingClientRect();
  const videoTop = videoOffset.top;
  const videoBottom = videoOffset.bottom;
  const inView = (videoTop - windowHeight <= 0) && (videoBottom - windowHeight > 0);
  return inView;
}

/**
 * Play videos when they're in view. Pause them when they're out of view
 * @param {Object[]} videos 
 */
const primeVideosOnScroll = videos => {
  const handleScrollEvent = () => {
    // Check if any of the videos are in view and change their plaing / paused
    // state accordingly
    videos.forEach(v => {
      const inView = isVideoInView(v);
      if (inView) {
        if (! v.video.paused) return;
        v.video.play();
        v.video.loop = true;
      } else {
        if (v.video.paused) return;
        v.video.pause();
      }
    });
  }
  
  window.addEventListener('scroll', event => {
    debounce(400).then(() => handleScrollEvent())
  }, false);
}

const initHomepage = () => {
  runOpener();
  const projectVideos = initProjectVideos();
  primeVideosOnScroll( projectVideos );
}

window.onload = initHomepage;