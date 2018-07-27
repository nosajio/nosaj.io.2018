import { els } from '../../utils/helpers';
import Slider from 'vanilla-slider';

const initSliders = () => {
  const sliderEls = els('.slider');
  const sliders = Array.from(sliderEls).map(sliderEl => new Slider(sliderEl));
}

initSliders();