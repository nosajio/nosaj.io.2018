import { Matrix, getNodeAt } from './matrix';

const el = el => document.querySelector(el);

const sineMeUp = (matrix, frame) => {
  const rows = matrix.rows;
  const cols = matrix.cols;
  matrix.reset();
  const pos = (frame);
  const mod = (frame / 4) % 100;

  const sine = (pos=0, amp=2, size=4, color='blue') => {
    matrix.each((node, index) => {
      const x = index % cols;
      const y = Math.round(rows / 2 + size * Math.sin((x + pos) / amp));
      if (node.position.x === x && node.position.y === y) {
        node.setColor(color);
      }
    });
  }

  sine(pos, 2, 4, 'yellow');
  
  matrix.update();
}

const gradMeUp = () => {

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

  // const configuration = getConfiguration();
  const size = 20;

  const matrix = new Matrix(stage, size);

  let frame = 1;
  const draw = () => {
    sineMeUp(matrix, frame); 
    // gradMeUp(matrix, frame);
    frame ++;
    requestAnimationFrame(() => draw())
  }
  
  draw()

}

const opener = () => {
  nosajMatrixDisplay();
}

export default opener