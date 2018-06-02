const { getViewHTML } = require('../compiler/compile-views');
const { assetFromFS } = require('../compiler/compile-assets');
const { log, error } = require('server/logging')('render-homepage');

const renderHomepage = () => {
  const css = assetFromFS('homepage.css');
  const js = assetFromFS('main.js');
  const view = getViewHTML('homepage/homepage', { css, js });
  return view;
}

module.exports = renderHomepage;