// Some helpers

// How far has the mouse moved from given coords
const diffCoords = (a, b) => ([
  (a[0] - b[0]) * -1,
  (a[1] - b[1]) * -1
]);

// Return the X value to bring a certain slide index into view
const originForIndex = n => {
  if (n === 0) return 0;
  const totalWidth = document.body.getBoundingClientRect().width;
  return -1 * totalWidth * n;
}

// Return integer value to either...
// go back (-1)
// stay (0)
// move ahead (1)
const changeSlide = xDiff => {
  if (xDiff === 0) return 0;
  let isNegative = xDiff < 0;
  // Tolerance fraction sets how far items must be dragged relative to the width
  // of the screen before a move should be triggered
  const toleranceFr = 0.2;

  const totalWidth = document.body.getBoundingClientRect().width;
  const tolerance = totalWidth * toleranceFr;
  const overTolerance = tolerance - Math.abs(xDiff) <= 0;

  // The tolerance hasn't been passed, so stay put this time
  if (! overTolerance) return 0;
  // ...otherwise decide which way to move based on the value of the diff
  return isNegative ? 1 : -1;
}

export default class SlideGallery {
  constructor(el) {

    // Hold onto the slide container
    this.el = el;

    const slidesCount = el.children.length;
    
    // Setup the internal state
    this.state = {
      slidesCount,
      active: 0,       // Index of the slide that is in view
      diffX:  0,       // How far has the slide been dragged from it's origin?
    }

    this._attachMoveEvents();
  }

  updateIndex(n) {
    // When at the start or the end, don't advance into the darkness
    if (n < 0 || n >= this.state.slidesCount) {
      return;
    }
    this.state.active = n;
  }

  /**
   * Move slide on the X axis
   * @param {Number} by How many pixels to move the slide
   */
  _translateSlide(by) {
    this.el.style.transform = `translateX(${by}px)`;
  }

  /**
   * The same as _translateSlide but moves the slide from an origin position
   * @param {Number} index 
   * @param {Number} by 
   */
  _translateFromOrigin(index, by) {
    const originX = originForIndex(index);
    this._translateSlide(by + originX);
  }

  
  _returnToOrigin() {
    const { active } = this.state;
    const origin = originForIndex(active);
    this._translateSlide(origin);
  }

  _attachMoveEvents() {
    let touchOrigin = [0, 0];
    let touchDown = false;
    
    // All the event handlers
    const handleTouchStart = event => {
      touchDown = true;
      touchOrigin = [event.clientX, event.clientY];
    }

    const handleTouchEnd = event => {
      touchDown = false;


      const changeWeight = changeSlide(this.state.diffX);
      this.updateIndex(this.state.active + changeWeight);
      this._returnToOrigin();
      
      // Reset transient state items
      this.state.diffX = 0;
      console.log(this.state);
    }

    const handleTouchMove = event => {
      if (! touchDown) {
        return;
      }
      
      const movedTo = [event.clientX, event.clientY]
      const [diffX] = diffCoords(touchOrigin, movedTo);

      if (diffX === 0) {
        return;
      }
      
      this._translateFromOrigin(this.state.active, diffX);
      this.state.diffX = diffX;
      
    }
    
    // Use built in touch events when possible
    this.el.addEventListener('touchstart', handleTouchStart);
    this.el.addEventListener('touchend',   handleTouchEnd);

    // Fake it with mouse events for consistent behaviour between devices
    this.el.addEventListener('mousedown', handleTouchStart);
    this.el.addEventListener('mouseup',   handleTouchEnd);

    // Handle the moving of slides
    this.el.addEventListener('touchmove', handleTouchMove);
    this.el.addEventListener('mousemove', handleTouchMove);
  }

  
  
}