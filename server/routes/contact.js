const renderContact = require('../renderers/contact-renderer');

module.exports = async (ctx, next) => {
  const { request, response } = ctx;
  try {
    response.body = await renderContact();
  } catch (err) {
    ctx.throw(500, err);
  }
}