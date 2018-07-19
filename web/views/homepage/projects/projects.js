import { els } from 'utils/helpers';


/**
 * 
 * @param {HTMLElement} containerEl 
 */
const extractVideoData = containerEl => ({
  parent: containerEl,
  src: containerEl.dataset.videoUrl,
});


/**
 * 
 * @param {HTMLElement[]} vidContainers 
 */
const preloadVideos = vidContainers => {
  const videosMap = vidContainers.map(el => {
    const data = extractVideoData(el);
    const videoEl = document.createElement('video');
    videoEl.src = data.src;
    data.parent.appendChild(videoEl);
    data.video = videoEl;
    return data;
  });
  return videosMap;
}


export const initProjectVideos = () => {
  const videoEls = els('[data-video-url]');
  return preloadVideos(Array.from(videoEls));
}