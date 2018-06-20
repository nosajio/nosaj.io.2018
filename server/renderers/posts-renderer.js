const { getViewHTML } = require('../compiler/compile-views')
const { assetFromFS, memfs } = require('../compiler/compile-assets');
const { getPosts } = require('server/services/nosaj-api-service');
const { log, error } = require('server/logging')('render-posts');

const renderPosts = async () => {
  const css = assetFromFS('posts.css');
  const js = assetFromFS('posts.js');
  const posts = await getPosts();
  const viewData = { css, js, posts };
  const view = getViewHTML('posts/posts', viewData);
  return view;
}

module.exports = renderPosts