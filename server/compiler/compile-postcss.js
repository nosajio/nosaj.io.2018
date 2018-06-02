const { fromBase } = require('constants/paths')
const fs = require('fs');
const postcss = require('postcss');
const { msopts, ms } = require('modularscale-helpers');

const { error, log } = require('server/logging')('compile-postcss');

const postcssFns = {
  scaleInit: opts => msopts(opts),
  scale: e => ms(e),
}

// Plugins to apply to the postcss pipeline
const postcssPlugins = [
  require('autoprefixer'),
  require('postcss-import'),
  require('postcss-functions')(postcssFns),
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