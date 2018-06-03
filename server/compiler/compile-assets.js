const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const { basedir, fromBase } = require('constants/paths');
const openFileAndPostcss = require('./compile-postcss');

const { error, log } = require('server/logging')('compile-assets');

const dev = process.env.ENV === 'development';

// Initialise the memory filesystem where the assets will be stored
// until they are needed in response to incoming requests.
// * Keep out of scope so that memfs can act as a in memory cache for assets
const memfs = new MemoryFS();

/**
 * Retrieve an asset from filesystem
 * @param {String[]} assetPath The path from the output directory to
 *                                  the requested file.
 */
const assetFromFS = assetPath => {
  try {
    const assetString = memfs.readFileSync(`/${assetPath}`).toString();
    return assetString;
  } catch(err) {
    throw err;
  }
}


/**
 * Save an asset as a fake file in memory
 * @param {String} filepath 
 * @param {String} contents 
 */
const assetToFS = (filepath, contents) => {
  const filename = path.basename(filepath);
  memfs.writeFileSync(`/${filename}`, contents);
}


/**
 * Compile postcss css files to memory. Handles an array of entry points
 * @param {String[]} entries - entry paths should be relative to project dir
 */
const cssToMemory = async entries => {
  const postcssOps = entries.map(e => openFileAndPostcss(e));
  const cssBundles = await Promise.all(postcssOps).catch(err => error(err));
  if (! cssBundles || cssBundles.length === 0) {
    return Promise.reject('Cannot bundle CSS to memory. This might be because there was a syntax error in your css.');
  }
  try {
    cssBundles.forEach(b => assetToFS(...b));
  } catch(err) {
    throw err;
  }
  return entries;
}



/**
 * Compile assets from entry point and return a Map of bundles
 * @param {String|String[]} entry
 */
const bundleToMemory = entry => new Promise(resolve => {
  
  // Setup the webpack options
  // TODO move this into a config file, split for prod/dev environments
  const options = {
    mode: dev ? 'development' : 'production',
    entry,

    output: {
      // Don't mirror the machine's filesystem, start at root instead. It's only
      // an in memory abstraction anyway
      path: '/'
    },
  };

  // Prime the webpack compiler and then configure and run it
  const compiler = webpack(options);

  // Use the memory filesystem
  compiler.outputFileSystem = memfs;
  
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      error(stats.compilation.errors);
      return;
    }
    const compileTime = stats.endTime - stats.startTime;
    log('Compiled assets in %sms', compileTime);

    resolve();
  });
});


module.exports = { assetFromFS, bundleToMemory, cssToMemory }