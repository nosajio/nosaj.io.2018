const { getViewHTML }         = require('../compiler/compile-views');
const { assetFromFS }         = require('../compiler/compile-assets');
const { getPosts }            = require('../services/nosaj-api-service');
const { composePageMeta }     = require('../utils/metadata');
const { log, error }          = require('../logging')('render-homepage');

const withMetadata = composePageMeta(
  'Jason makes the internet', 
  '🛠  Websites and apps from scratch.',
  '/'
)

const page = {
  maxPosts: 3,
}

/**
 * Multiple renderers for running different experiments
 */

const renderHomepage1 = async () => {
  // Get all the view data
  const css      = assetFromFS('homepage.css');
  const js       = assetFromFS('homepage.js');
  const posts    = await getPosts();
  const viewData = withMetadata({ css, js, posts: posts.slice(0, page.maxPosts) });

  // Generate the view
  return getViewHTML('homepage/homepage', viewData);
}

const renderHomepage2 = async () => {
  // Get all the view data
  const css      = assetFromFS('homepage.css');
  const js       = assetFromFS('homepage.js');
  const posts    = await getPosts();
  const viewData = withMetadata({ css, js, posts: posts.slice(0, page.maxPosts) });

  // Generate the view
  return getViewHTML('homepage/homepage2', viewData);
}

/**
 * 
 * @param {Number} version Which version of the page to render
 */
const renderHomepage = async (version=1) => {
  try {
    switch(version) {
      case 1: return await renderHomepage1();
      case 2: return await renderHomepage2();
      default: return await renderHomepage1();
    }
  } catch(err) {
    throw err;
  }
}

module.exports = renderHomepage