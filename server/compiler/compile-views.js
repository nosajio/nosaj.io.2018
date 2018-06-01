const path = require('path');
const { compileFile } = require('pug');
const { viewsdir } = require('constants/paths');

const { log, error } = require('server/logging')('compile-views');

const dev = process.env.ENV === 'development';

const pugOptions = {
  basedir: viewsdir,
  pretty: dev,
};

const resolveViewPath = viewFile => path.join(viewsdir, viewFile)

const getViewHTML = (viewName, data) => {
  const compileFn = compileFile(resolveViewPath(`${viewName}.pug`), pugOptions);
  const html = compileFn(data);
  return html;
}

module.exports = { getViewHTML };