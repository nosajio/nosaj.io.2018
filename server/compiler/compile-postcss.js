const { fromBase } = require('constants/paths')
const fs = require('fs');
const postcss = require('postcss');

const { error, log } = require('server/logging')('compile-postcss');

// Plugins to apply to the postcss pipeline
const postcssPlugins = [
  require('autoprefixer')
];

/**
 * Open a css file and buffer the contents to postcss
 * @param {String} filepath - Path to a css file to be compiiled
 */
const openFileAndPostcss = filepath => {
  const pathFromBase = fromBase(filepath);
  let fileContents;
  try {
    fileContents = fs.readFileSync(pathFromBase);
  } catch (err) {
    error('Couldn\'t open the css file for some reason');
    return Promise.reject(err);
  }
  return postcss(postcssPlugins)
    .process(fileContents, { from: pathFromBase })
    .then(result => ([filepath, result.css]))
}

module.exports = openFileAndPostcss;