const { getViewHTML }           = require('../compiler/compile-views')
const { assetFromFS, memfs }    = require('../compiler/compile-assets');
const { getPosts, findPost }    = require('../services/nosaj-api-service');
const { composePageMeta }       = require('../utils/metadata');
const { nosajUrl }              = require('../utils/urls');
const { log, error }            = require('../logging')('render-post');
const { twitterShareUrl, facebookShareUrl } = require('../utils/social');

/**
 * Take n paragraphs from the html string. For use with the page description
 * @param {String} html The HTML string
 * @param {Number} paragraphCount How many paragraphs to take
 */
const preview = (html, paragraphCount=1) => {
  const pMatch = /<p>(.*?)<\/p>/gm;
  const text = [];
  let match;
  while (match = pMatch.exec( String(html) )) {
    if (text.length >= paragraphCount) {
      break;
    }
    text.push(match[1]);
  }
  return text.join(' ');
}


/**
 * Return a subset of posts after the current. If the end of the list is reached,
 * overflow to the beginning.
 * @param {Object[]} allPosts The full posts
 * @param {Object} post The current post
 * @param {Number} count How many next posts to return
 */
const nextPosts = (allPosts, post, count) => {
  const postIndex = allPosts.indexOf(post);
  const lastIndex = allPosts.length - 1;
  const next = [];
  let nextIndex = postIndex + 1;
  while(count--) {
    const nextItem = nextIndex > lastIndex ? allPosts[nextIndex - lastIndex] : allPosts[nextIndex];
    next.push(nextItem);
    nextIndex ++;
  }
  return next;
}


const renderPost = async slug => {
  const css = assetFromFS('post.css');
  const js  = assetFromFS('post.js');
  const allPosts = await getPosts();
  const post = findPost(slug, allPosts);
  const postUrl = nosajUrl(`/r/${slug}`);

  // Augment excerpt text with share links
  if (post.excerpts && Array.isArray(post.excerpts)) {
    post.excerpts = post.excerpts.map(ex => ({
      text: ex,
      withUrl: `"${ex}"\n${postUrl}`,
      tweetUrl: twitterShareUrl(ex, postUrl),
      facebookUrl: facebookShareUrl(ex, postUrl)
    }));
  }
  
  // Nest the next posts in with this one
  post.next = nextPosts(allPosts, post, 3);

  // Configure the meta and og tags 
  const withMeta = composePageMeta(post.title, preview(post.body, 2), `/r/${post.slug}`, post.covers[0]);

  // Merge view data and generate HTML
  const viewData = withMeta({ css, js, post });
  const view = getViewHTML('post/post', viewData);
  return view;
}

module.exports = renderPost