
module.exports = async (ctx, next) => {
  try {
    response.body = {};
  } catch (err) {
    ctx.throw(500, 'Error processing the email');
  }
}