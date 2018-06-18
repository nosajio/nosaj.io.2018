const { getViewHTML } = require('../compiler/compile-views')
const { assetFromFS, memfs } = require('../compiler/compile-assets');
const { getPost }     = require('server/services/nosaj-api-service');
const { log, error }  = require('server/logging')('render-post');

const renderPost = async slug => {
  const css = assetFromFS('post.css');
  const js  = assetFromFS('post.js');
  const post = await getPost(slug);
  const viewData = { css, js, post };
  const view = getViewHTML('post/post', viewData);
  return view;
}

module.exports = renderPost