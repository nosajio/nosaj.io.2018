// Boot the server by bundling assets and keeping them in memory until they're 
// requested

const Koa       = require('koa');
const koaStatic = require('koa-static');
const app       = new Koa();

const { bundleToMemory, cssToMemory } = require('./compiler/compile-assets');
const { log, error } = require('server/logging')('server');
const { fromBase } = require('constants/paths');
const router = require('./router');

const renderError = require('./renderers/errors');

const listenPort = process.env.PORT || 3012;

const bootServer = async ({ css, js, staticPath }) => {
  // Bundle up scripts and stylesheets and save to memory on boot. Then we can
  // rapidly get to them when a request comes in.
  await bundleToMemory(js);
  await cssToMemory(css).catch(err => error(err));

  // Downstream error reporting middleware
  // https://github.com/koajs/koa/wiki/Error-Handling
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      err.expose = true;
      ctx.status = err.status || 500;
      if (ctx.status >= 300) {
        ctx.body = renderError(ctx.status);
        ctx.app.emit('error', err, ctx);
      }
    }
  });
  app.on('error', (err, ctx) => {
    error('%s was encountered: %O', ctx.status, err);
  });

  // Slot the router into Koa middleware
  app.use( router.routes() );

  // Setup the static middleware, which will serve static assets from a directory
  app.use(koaStatic(fromBase(staticPath)))

  // Listen on port in the .env file
  app.listen(listenPort);
  log('-> http://localhost:%s', listenPort);
}

module.exports = bootServer
