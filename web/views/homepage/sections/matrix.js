import Two from 'two.js';

// Set the global constraints. These help avoid the problem of what to do for 
// really large displays, on which nodes will have to be more spread out to 
// compensate for the resolution.
const MAX_COLS = 30;
const MAX_ROWS = 10;

export const getNodeAt = (y, x, matrix) => matrix[y][x];

// The MatrixDot is a wrapper around a two.js circle
class MatrixDot {
  constructor(radius, x, y, stage) {
    this.defaultColor = '#444';
    this.shape = stage.makeCircle(x, y, radius).center();
    this.stage = stage;
    this.resetShape();
  }

  // Remove styling and defaults
  resetShape() {
    this.shape.noStroke();
    this.setColor(this.defaultColor)
  }

  // Set the color to new value
  setColor(color) {
    this.shape.fill = color;
  }

  changeColor(toColor) {
    // Only change colour if it's different
    if (toColor === this.shape.fill) {
      return;
    }
    this.shape.fill = toColor;
    this.stage.update();
  }
}

// Get the position of a node from an index
const pos = (i, gap, gapDivide = 3) => i * gap + gap / gapDivide;

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
  for (let i = 0; i < MAX_COLS; i++) {
    const x = pos(i, totalNodes);
    const currentNode = new MatrixDot(nodeSize / 2, x, y, stage);
    rowOfNodes.push(currentNode);
  }
  return rowOfNodes;
}

/**
 * 
 * @param {Two} stage 
 * @param {*} nodeSize 
 */
const createMatrix = (stage, nodeSize) => {
  const w = stage.width;
  const h = stage.height;
  const spaceSize = Math.round(stage.height / MAX_ROWS);
  const matrix = [];
  for (let i = 0; i < MAX_ROWS; i++) {
    const y = pos(i, spaceSize);
    matrix.push(createRowOfNodes(y, w, nodeSize, stage));
  }
  return matrix;
}


export class Matrix {
  constructor(stage, size=10) {
    const matrix = createMatrix(stage, size);
    return matrix
  }
}
