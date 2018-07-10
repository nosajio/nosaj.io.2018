
module.exports = async (ctx, next) => {
  const { request, response } = ctx;
  try {
    response.body = {};
  } catch (err) {
    ctx.throw(500, 'Error processing the email');
  }
}