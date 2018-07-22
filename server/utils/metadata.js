const package = require('../../package.json');
const { nosajUrl } = require('./urls');

/**
 * Create a standard page metadata object. Should be used 
 * @param {String} title The page title
 * @param {String} url Used for OG 
 * @param {String} description 
 * @param {String} image Used for OG
 * @returns {Fuction}
 */
exports.composePageMeta = (
  // defaults
  title='Jason makes the internet',
  description='',
  path='/',
  image='https://a.nosaj.io/og-nosaj-6.png'
) => (view) => ({
  ...view,
  meta: {
    title: `${title} // Jason Howmans`,
    description,
    version: package.version,
    og: {
      url: nosajUrl(path),
      description,
      image,
    }
  }
});