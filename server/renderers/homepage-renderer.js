const { getViewHTML } = require('../compiler/compile-views');
const { assetFromFS } = require('../compiler/compile-assets');
const { getPosts } = require('server/services/nosaj-api-service');
const { log, error } = require('server/logging')('render-homepage');

const page = {
  maxPosts: 3,
}

const renderHomepage = async () => {
  // Get all the view data
  const css      = assetFromFS('homepage.css');
  const js       = assetFromFS('homepage.js');
  const posts    = await getPosts();
  const viewData = { css, js, posts: posts.slice(0, page.maxPosts) };

  // Generate the view
  const view = getViewHTML('homepage/homepage', viewData);
  
  return view;
}

module.exports = renderHomepage