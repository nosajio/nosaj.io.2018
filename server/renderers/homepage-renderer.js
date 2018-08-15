const { getViewHTML }             = require('../compiler/compile-views');
const { assetFromFS }             = require('../compiler/compile-assets');
const { getPosts }                = require('../services/nosaj-api-service');
const { composePageMeta }         = require('../utils/metadata');
const { composeWithExperiment }   = require('../utils/analytics');
const { log, error }              = require('../logging')('render-homepage');

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

const renderHomepageA = async () => {
  const withExperiment = composeWithExperiment('homepage', 'A');
  
  // Get all the view data
  const css      = assetFromFS('homepage.css');
  const js       = assetFromFS('homepage.js');
  const posts    = await getPosts();
  
  // Combine with metadate & experiment code
  const viewData = withExperiment( withMetadata({ css, js, posts: posts.slice(0, page.maxPosts) }) );
  
  // Generate the view
  return getViewHTML('homepage/homepage', viewData);
}

const renderHomepageB = async () => {
  const withExperiment = composeWithExperiment('homepage', 'B');
  // Get all the view data
  const css      = assetFromFS('homepage.css');
  const js       = assetFromFS('homepage.js');
  const posts    = await getPosts();

  // Combine with metadate & experiment code
  const viewData = withExperiment( withMetadata({ css, js, posts: posts.slice(0, page.maxPosts) }) );

  // Generate the view
  return getViewHTML('homepage/homepage2', viewData);
}

/**
 * 
 * @param {String} version Which version of the page to render
 */
const renderHomepage = async (version='A') => {
  try {
    switch(version) {
      case 'A': return await renderHomepageA();
      case 'B': return await renderHomepageB();
      default: return await renderHomepageA();
    }
  } catch(err) {
    throw err;
  }
}

module.exports = renderHomepage