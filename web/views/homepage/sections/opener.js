import { Matrix, getNodeAt } from './matrix';

const el = el => document.querySelector(el);

const generateFrame = (frame, matrix) => {
  const colors = {
    on: '#EFF443',
    off: '#111'
  }
  const rowsCount = matrix.length;
  const colsCount = matrix[0].length;
  const mod = frame % rowsCount - 1;
  const sine = Math.sin(mod * Math.PI);
  const normalisedSine = Math.round(mod);
  console.log(normalisedSine, mod)
  const node = getNodeAt(normalisedSine - 1, mod, matrix);
  node.changeColor(colors.on);
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
  const size = 10;

  const matrix = new Matrix(stage, size);

  // playConfiguration(matrix, configuration);
  stage.bind('update', (frame) => {
    generateFrame(frame, matrix);
  }).play();

  // stage.update();
}

const opener = () => {
  nosajMatrixDisplay();
}

export default opener