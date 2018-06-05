import Two from 'two.js';

const el = el => document.querySelector(el);

class MatrixDot {
  constructor(radius, x, y, stage) {
    this.shape = stage.makeCircle(x, y, radius).center();
    this.resetShape();
  }

  // Remove styling and defaults
  resetShape() {
    this.shape.noStroke();
  }
  
  // Set the color to new value
  setColor(color) {
    this.shape.fill = color;
  }

  // Changes the color in a smooth transition
  changeColor() {
    
  }
}

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
const createRowOfNodes = (y, width, gapSize, nodeSize, stage) => {
  const totalNodes = Math.round(width / gapSize);
  const rowOfNodes = [];
  for (let i=0; i < totalNodes; i++) {
    const x = pos(i, gapSize);
    const currentNode = new MatrixDot(nodeSize/2, x, y, stage);
    rowOfNodes.push(currentNode);
  }
  return rowOfNodes;
}

const createMatrix = stage => {
  const w = stage.width;
  const h = stage.height;
  const nodeSize = 15;
  const gap = nodeSize * 4;
  const rowsCount = Math.round(stage.height / gap);
  const matrix = stage.makeGroup().center();
  for (let i=0; i < rowsCount; i++) {
    const y = pos(i, gap);
    matrix.add(...createRowOfNodes(y, w, gap, nodeSize, stage));
  }
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

  createMatrix(stage);

  stage.update();
  
}

const opener = () => {
  nosajMatrixDisplay();
}

export default opener