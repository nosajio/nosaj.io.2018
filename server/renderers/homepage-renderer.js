const { getViewHTML } = require('../compiler/compile-views');
const { assetFromFS } = require('../compiler/compile-assets');
const { getPosts } = require('server/services/nosaj-api-service');
const { log, error } = require('server/logging')('render-homepage');

const renderHomepage = async () => {
  const css   = assetFromFS('homepage.css');
  const js    = assetFromFS('main.js');
  const posts = await getPosts();
  const view  = getViewHTML('homepage/homepage', { css, js, posts: posts.slice(0, 2) });
  return view;
}

module.exports = renderHomepage