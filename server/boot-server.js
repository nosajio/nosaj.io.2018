// Boot the server by bundling assets and keeping them in memory until they're 
// requested

const Koa       = require('koa');
const koaStatic = require('koa-static');
const app       = new Koa();

const { bundleToMemory, cssToMemory } = require('./compiler/compile-assets');
const { log, error } = require('server/logging')('server');
const { fromBase } = require('constants/paths');

const renderError = require('./renderers/errors/500');
const renderHomepage = require('./renderers/homepage-renderer');

const listenPort = process.env.PORT || 3012;

const bootServer = async ({ css, js, staticPath }) => {
  // Bundle up scripts and stylesheets and save to memory on boot. Then we can
  // rapidly get to them when a request comes in.
  await bundleToMemory(js);
  await cssToMemory(css).catch(err => error(err));

  // Setup the static middleware, which will serve static assets from a directory
  app.use( koaStatic(fromBase(staticPath)) )

  // Setup the one and only request handler
  app.use(async ctx => {
    const { request, response } = ctx;
    // TODO use koa-router when it's time to make the blog...
    // => https://github.com/alexmingoia/koa-router
    switch (request.url) {
      // Home route
      case '/':
        try {
          response.body = await renderHomepage();
        } catch (err) {
          error('500 was thrown: %s', err);
          ctx.status = 500;
          ctx.body = renderError();
        }
        break;
      case '/r':
    }
    return;
  });

  app.listen(listenPort);
  log('-> http://localhost:%s', listenPort);
}

module.exports = bootServer
