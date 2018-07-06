const Router = require('koa-router');

const configureRoutes = () => {
  const router = new Router();

  // Homepage
  router.get('/',         require('./routes/homepage'));
  router.get('/r',        require('./routes/posts'));
  router.get('/r/:slug',  require('./routes/post'));

  // There are two contact routes, the post is for handling the email form post
  router.get('/contact',  require('./routes/contact'));
  router.post('/email',   require('./routes/email'));
  
  return router;
}


module.exports = configureRoutes();