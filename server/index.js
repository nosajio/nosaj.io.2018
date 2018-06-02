// Boot the server by bundling assets and keeping them in memory until they're 
// requested

require('dotenv').config();

const Koa = require('koa');
const app = new Koa();

const { bundleToMemory, cssToMemory } = require('./compiler/compile-assets');
const { log, error } = require('server/logging')('server');

const listenPort = process.env.PORT || 3012;

const renderHomepage = require('./renderers/homepage-renderer');

const bootServer = async () => {
  // Bundle up scripts and stylesheets and save to memory on boot. Then we can
  // rapidly get to them when a request comes in.
  await bundleToMemory(['./web/index.js']);
  await cssToMemory(['./web/views/homepage/homepage.css']).catch(err => error(err));


  // Setup the one and only request handler
  app.use(async ({request, response}) => {
    // TODO if this gets to > a few routes, refactor into simple route => renderer function
    switch (request.url) {
      // Home route
      case '/':
        response.body = renderHomepage();      
        return;
    }
    return;
  });

  app.listen(listenPort);  
  log('-> http://localhost:%s', listenPort);
}

bootServer();


