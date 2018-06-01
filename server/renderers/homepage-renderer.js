const { getViewHTML } = require('../compiler/compile-views');
const { assetFromFS } = require('../compiler/compile-assets');


const renderHomepage = () => {
  const view = getViewHTML('homepage');
  return view;
}

module.exports = renderHomepage;