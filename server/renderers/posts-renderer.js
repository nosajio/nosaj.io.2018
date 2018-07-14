const { getViewHTML }         = require('../compiler/compile-views')
const { assetFromFS, memfs }  = require('../compiler/compile-assets');
const { getPosts }            = require('../services/nosaj-api-service');
const { log, error }          = require('../logging')('render-posts');
const { composePageMeta }     = require('../utils/metadata');

const withMetadata = composePageMeta(
  'Blog', 
  'A little place on the internet where I think in public about design, making, entrepreneurship, and other topics.',
  '/r'
);

const renderPosts = async () => {
  const css = assetFromFS('posts.css');
  const js = assetFromFS('posts.js');
  const posts = await getPosts();
  const viewData = withMetadata({ css, js, posts });
  const view = getViewHTML('posts/posts', viewData);
  return view;
}

module.exports = renderPosts