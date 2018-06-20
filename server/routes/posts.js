const renderPosts = require('../renderers/posts-renderer.js');

module.exports = async (ctx, next) => {
  const { request, response } = ctx;
  try {
    response.body = await renderPosts();
  } catch(err) {
    ctx.throw(500, 'Can\'t get posts right now', { err });
  }
}