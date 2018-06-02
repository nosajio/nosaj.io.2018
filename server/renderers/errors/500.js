const { getViewHTML } = require('../../compiler/compile-views');

const renderError500 = () => {
  // Write CSS here incase the 500 came from the filesystem
  const css = `
    body {
      color: red;
    }
  `;
  return getViewHTML('errors/500', {css})
}

module.exports = renderError500;