require('dotenv').config();

const boot = require('./boot-server');

const withAssets = {
  staticPath: './web/static',
  js: ['./web/index.js'],
  css: ['./web/views/homepage/homepage.css']
}

boot( withAssets );