const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const { basedir, fromBase } = require('constants/paths');

const { error, log } = require('server/logging')('compile-assets');

// Initialise the memory filesystem where the assets will be stored
// until they are needed in response to incoming requests.
// * Keep out of scope so that memfs can act as a in memory cache for assets
const memfs = new MemoryFS();

/**
 * Retrieve an asset from filesystem
 * @param {...String} relativePaths The path from the output directory to
 *                                  the requested file.
 */
const assetFromFS = (...relativePaths) => {
  const assetPath = fromBase('dist', ...relativePaths);
  const assetString = memfs.readFileSync(assetPath).toString();
  return assetString;
}

/**
 * Compile multiple bundles from multiple entry points
 * @param {...String} entries 
 */
const bundleEntries = async (...entries) => {
  const compileOps = entries.map(entry => bundleToMemory(entry));
  return await Promise.all(compileOps);
}

/**
 * Compile assets from entry point and return a Map of bundles
 * @param {String} entry
 */
const bundleToMemory = entry => new Promise(resolve => {
  
  // Setup the webpack options
  // TODO move this into a config file, split for prod/dev environments
  const options = {
    mode: 'development',
    entry,
    output: {
      filename: `bundle-${entry}`,
    }
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

    resolve(
      assetFromFS(`bundle-${entry}`)
    );
  });
});

module.exports = { assetFromFS, bundleToMemory, bundleEntries }