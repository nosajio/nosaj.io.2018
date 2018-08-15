const renderHomepage = require('../renderers/homepage-renderer');
const Experiment = require('../experiments/view-experiment');

module.exports = async (ctx, next) => {
  const { request, response } = ctx;
  try {
    const view = new Experiment([
      async () => await renderHomepage('A'),
      async () => await renderHomepage('B')
    ]);
    response.body = await view.render();
  } catch (err) {
    throw err;
  }
}