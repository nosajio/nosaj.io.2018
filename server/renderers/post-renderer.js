const { getViewHTML }         = require('../compiler/compile-views')
const { assetFromFS, memfs }  = require('../compiler/compile-assets');
const { getPost }             = require('../services/nosaj-api-service');
const { composePageMeta }     = require('../utils/metadata');
const { log, error }          = require('../logging')('render-post');

/**
 * Take n paragraphs from the html string
 * @param {String} html 
 * @param {Number} paragraphCount 
 */
const excerpt = (html, paragraphCount=1) => {
  const pMatch = /<p>(.*?)<\/p>/gm;
  const text = [];
  let match;
  while (match = pMatch.exec(html)) {
    if (text.length >= paragraphCount) {
      break;
    }
    text.push(match[1]);
  }
  return text.join(' ');
}

const renderPost = async slug => {
  const css = assetFromFS('post.css');
  const js  = assetFromFS('post.js');
  const post = await getPost(slug);

  // Configure the meta and og tags 
  const withMeta = composePageMeta(post.title, excerpt(post.body, 2), `/r/${post.slug}`, post.covers[0]);

  // Merge view data and generate HTML
  const viewData = withMeta({ css, js, post });
  const view = getViewHTML('post/post', viewData);
  return view;
}

module.exports = renderPost