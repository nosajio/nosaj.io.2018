const Router = require('koa-router');

const configureRoutes = () => {
  const router = new Router();

  // Homepage
  router.get('/', require('./routes/homepage'));
  router.get('/r', require('./routes/posts'));
  router.get('/r/:slug', require('./routes/post'));
  
  return router;
}


module.exports = configureRoutes();