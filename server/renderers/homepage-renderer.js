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

const renderHomepage = async () => {
  // Get all the view data
  const css      = assetFromFS('homepage.css');
  const js       = assetFromFS('homepage.js');
  const posts    = await getPosts();
  const viewData = withMetadata({ css, js, posts: posts.slice(0, page.maxPosts) });

  // Generate the view
  const view = getViewHTML('homepage/homepage', viewData);
  
  return view;
}

module.exports = renderHomepage