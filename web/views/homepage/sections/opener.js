import Two from 'two.js';

// Set the global constraints. These help avoid the problem of what to do for 
// really large displays, on which nodes will have to be more spread out to 
// compensate for the resolution.
const MAX_COLS = 30;
const MAX_ROWS = 10;

const el = el => document.querySelector(el);

// A configuration is just an array of frames. A frame is an array of arrays 
// that holds a colour value for each node of the matrix
const getConfiguration = () => {
  const config = [];
  
  const getFrame = f => {
    const frame = [];
    // One row at a time
    for (let r = 0; r < MAX_ROWS; r++) {
      const row = [];
      // Column next...
      for (let c = 0; c < MAX_COLS; c++) {
        row.push(`#ff${Math.round(Math.random() * 9)}${Math.round(Math.random() * 9)}b${Math.round(Math.random() * 9)}`);
      }
      frame.push(row);
    }
    return frame;
  }

  // Let's make some frames
  for (let i=0; i < 10; i++) {
    config.push( getFrame(i) );
  }

  return config;
}

class MatrixDot {
  constructor(radius, x, y, stage) {
    this.shape = stage.makeCircle(x, y, radius).center();
    this.stage = stage;
    this.resetShape();
    this.setColor('#333');
  }

  // Remove styling and defaults
  resetShape() {
    this.shape.noStroke();
  }
  
  // Set the color to new value
  setColor(color) {
    this.shape.fill = color;
  }

  changeColor(toColor) {
    this.shape.fill = toColor;
    this.stage.update();
  }
}


const getNodeAt = (rowIndex, nodeIndex, matrix) => matrix[rowIndex][nodeIndex];

// Get the position of a node from an index
const pos = (i, gap, gapDivide=3) => i * gap + gap / gapDivide;

/**
 * Create a row of nodes and return them
 * @param {Number} y 
 * @param {Number} width 
 * @param {Number} nodeSize 
 * @param {Object} stage 
 * @returns {}
 */
const createRowOfNodes = (y, width, nodeSize, stage) => {
  const totalNodes = Math.round(width / MAX_COLS);
  const rowOfNodes = [];
  for (let i=0; i < MAX_COLS; i++) {
    const x = pos(i, totalNodes);
    const currentNode = new MatrixDot(nodeSize/2, x, y, stage);
    rowOfNodes.push(currentNode);
  }
  return rowOfNodes;
}

const createMatrix = (stage, nodeSize) => {
  const w = stage.width;
  const h = stage.height;
  const spaceSize = Math.round(stage.height / MAX_ROWS);
  const matrix = [];
  for (let i=0; i < MAX_ROWS; i++) {
    const y = pos(i, spaceSize);
    matrix.push(createRowOfNodes(y, w, nodeSize, stage));
  }
  return matrix;
}


const drawFrame = (frame, matrix) => {
  frame.forEach((row, ri) => {
    row.forEach((color, ci) => {
      const node = getNodeAt(ri, ci, matrix);
      if (!node) return;
      // No need to change if already the same color
      if (node.shape.fill === color) return;
      node.changeColor(color);
    });
  });
}

const getFrame = (frames, f) => {
  if (frames.length < f) {
    return null;
  }
  return frames[f];
}

const playConfiguration = (matrix, frames) => {
  const updateEvery = 100;
  let frame = 0;
  setInterval(() => {
    const currentFrame = getFrame(frames, frame);
    // Loop by resetting frame number when the last frame has been reached 
    if (! currentFrame) {
      frame = 0;
    } else {
      drawFrame(currentFrame, matrix);
      frame ++;
    }
  }, updateEvery);
}


const nosajMatrixDisplay = () => {
  const stageEl = el('.opener-art');

  // Setup the Two.js scene
  const stageBoundingClientRect = stageEl.getBoundingClientRect();
  const stage = new Two({
    width: stageBoundingClientRect.width,
    height: stageBoundingClientRect.height,
    type: Two.Types.canvas,
  });
  stage.appendTo(stageEl);

  const configuration = getConfiguration();
  const size = 10;

  const matrix = createMatrix(stage, size);

  playConfiguration(matrix, configuration);
  stage.update();
}

const opener = () => {
  nosajMatrixDisplay();
}

export default opener