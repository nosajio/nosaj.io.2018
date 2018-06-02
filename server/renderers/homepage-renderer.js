const { getViewHTML } = require('../compiler/compile-views');
const { assetFromFS } = require('../compiler/compile-assets');
const { log, error } = require('server/logging')('render-homepage');

const renderHomepage = () => {
  const view = getViewHTML('homepage/homepage');
  const css = assetFromFS('homepage.css');
  return view;
}

module.exports = renderHomepage;