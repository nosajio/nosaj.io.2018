// Boot the server by bundling assets and keeping them in memory until they're 
// requested

const Koa = require('koa');
const app = new Koa();

const { bundleToMemory, cssToMemory } = require('./compiler/compile-assets');
const { log, error } = require('server/logging')('server');

const listenPort = process.env.PORT || 3012;

const renderError = require('./renderers/errors/500');
const renderHomepage = require('./renderers/homepage-renderer');

const bootServer = async ({ css, js }) => {
  // Bundle up scripts and stylesheets and save to memory on boot. Then we can
  // rapidly get to them when a request comes in.
  await bundleToMemory(js);
  await cssToMemory(css).catch(err => error(err));


  // Setup the one and only request handler
  app.use(async ctx => {
    const { request, response } = ctx;
    // TODO if this gets to > a few routes, refactor into simple route => renderer function
    switch (request.url) {
      // Home route
      case '/':
        try {
          response.body = renderHomepage();
        } catch (err) {
          error('500 was thrown: %s', err);
          ctx.status = 500;
          ctx.body = renderError();
        }
        break;
    }
    return;
  });

  app.listen(listenPort);
  log('-> http://localhost:%s', listenPort);
}

module.exports = bootServer
