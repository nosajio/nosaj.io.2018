const Router = require('koa-router');

const configureRoutes = () => {
  const router = new Router();

  // Homepage
  router.get('/', require('./routes/homepage'));
  
  return router;
}


module.exports = configureRoutes();