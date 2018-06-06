import Two from 'two.js';

// Set the global constraints. These help avoid the problem of what to do for 
// really large displays, on which nodes will have to be more spread out to 
// compensate for the resolution.
const MAX_COLS = 20;
const MAX_ROWS = 12;

export const getNodeAt = (y, x, matrix) => matrix[y][x];

// The MatrixDot is a wrapper around a two.js circle
class MatrixDot {
  constructor(radius, x, y, col, row, stage, index) {
    this.position = { x: col, y: row };
    this.index = index;
    this.defaultColor = '#1A1C1E';
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
    if (this.shape.fill === color) {
      return false;
    }
    this.shape.fill = color;
    return true;
  }

  updateColor(toColor) {
    if (this.setColor(toColor)) {
      this.stage.update();
    }
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
let index = 0;
const createRowOfNodes = (y, row, width, nodeSize, stage) => {
  const totalNodes = Math.round(width / MAX_COLS);
  const rowOfNodes = [];
  for (let i = 0; i < MAX_COLS; i++) {
    const x = pos(i, totalNodes);
    const currentNode = new MatrixDot(nodeSize / 2, x, y, i, row, stage, index);
    rowOfNodes.push(currentNode);
    index ++;
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
    matrix.push(createRowOfNodes(y, i, w, nodeSize, stage));
  }
  return matrix;
}


export class Matrix {
  constructor(stage, size=10) {
    this.stage = stage;
    this.matrix = createMatrix(stage, size);
  }

  get rows() {
    return this.matrix.length;
  }

  get cols() {
    return this.matrix[0].length;
  }

  get length() {
    return this.rows * this.cols;
  }

  reset() {
    this.each(n => n.resetShape());
  }
  
  node(x,y) {
    try {
      return getNodeAt(y, x, this.matrix);
    } catch(err) {
      console.warn('Cannot get node at %s,%s', x, y);
      return undefined;
    }
  }

  // Enumerate over matrix items
  each(cb) {  
    const rowsCount = this.matrix.length;
    const colsCount = this.matrix[0].length;
    for(let r = 0; r < rowsCount; r++) {
      for(let c = 0; c < colsCount; c++) {
        const node = getNodeAt(r, c, this.matrix);
        cb(node, node.index);
      }
    }
  }
  
  update() {
    this.stage.update();
  }
}
