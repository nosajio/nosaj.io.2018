const renderPost = require('../renderers/post-renderer');

module.exports = async (ctx, next) => {
  const { request, response } = ctx;
  const { slug } = ctx.params;
  try {
    response.body = await renderPost(slug);
  } catch (err) {
    ctx.throw(500, 'There was a problem showing the post.', { err });
  }
}