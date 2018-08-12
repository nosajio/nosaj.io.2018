const { getViewHTML }           = require('../../compiler/compile-views');
const { composePageMeta }       = require('../../utils/metadata');

const renderError500 = () => {
  // Write CSS here incase the 500 came from the filesystem
  const css = `
    body {
      color: red;
    }
  `;
  const withMeta = composePageMeta();
  return getViewHTML('errors/500', withMeta({ css }))
}

module.exports = renderError500;