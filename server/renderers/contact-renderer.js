const { getViewHTML } = require('../compiler/compile-views');
const { assetFromFS } = require('../compiler/compile-assets');
const { log, error } = require('server/logging')('render-contact');

const renderContact = async () => {
  // Get all the view data
  const css = assetFromFS('contact.css');
  const js = assetFromFS('contact.js');
  const viewData = { css, js };

  // Generate the view
  const view = getViewHTML('contact/contact', viewData);

  return view;
}

module.exports = renderContact