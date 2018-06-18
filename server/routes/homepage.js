const renderHomepage = require('../renderers/homepage-renderer');

module.exports = async (ctx, next) => {
  const { request, response } = ctx;
  try {
    response.body = await renderHomepage();
  } catch (err) {
    ctx.throw(500, 'There was a problem showing the homepage.');
  }
}