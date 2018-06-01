// Boot the server by bundling assets and keeping them in memory until they're 
// requested

require('dotenv').config();

const Koa = require('koa');
const app = new Koa();

const { bundleToMemory, assetFromFS } = require('./compiler/compile-assets');
const { getViewHTML } = require('./compiler/compile-views');
const { log, error } = require('server/logging')('server');

const listenPort = process.env.PORT || 3012;

const renderHomepage = () => {
  const view = getViewHTML('homepage');
  return view;
}

const bootServer = async () => {
  await bundleToMemory('./web/index.js');

  app.use(async ({request, response}) => {
    if (request.url === '/') {
      log('home')
      response.body = renderHomepage();
    }
    return;
  });

  app.listen(listenPort);  
  log('-> http://localhost:%s', listenPort);
}

bootServer();


