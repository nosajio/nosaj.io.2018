require('dotenv').config();

const boot = require('./boot-server');

const withAssets = {
  staticPath: './web/static',

  // Homepage assets
  // TODO this could be automated if a few rules are adhered to
  js: { 
    homepage: './web/views/homepage/homepage.js', 
    post: './web/views/post/post.js'
  },
  css: ['./web/views/homepage/homepage.css', './web/views/post/post.css']
}

boot( withAssets );