const renderHomepage = require('../renderers/homepage-renderer');
const Experiment = require('../experiments/view-experiment');

module.exports = async (ctx, next) => {
  const { request, response } = ctx;
  try {
    const view = new Experiment([
      async () => await renderHomepage(1),
      async () => await renderHomepage(2)
    ]);
    response.body = await view.render();
  } catch (err) {
    throw err;
  }
}