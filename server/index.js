require('dotenv').config();

const boot = require('./boot-server');

const withAssets = {
  js: ['./web/index.js'],
  css: ['./web/views/homepage/homepage.css']
}

boot( withAssets );