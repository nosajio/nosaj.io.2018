require('dotenv').config();

const boot = require('./boot-server');

const withAssets = {
  staticPath: './web/static',

  // Homepage assets
  // TODO this could be automated if a few rules are adhered to
  js: ['./web/views/homepage/homepage.js'],
  css: ['./web/views/homepage/homepage.css']
}

boot( withAssets );