const path = require('path');

// 
// The root of the project
// 
const basedir = path.resolve(__dirname, '..');

//
// Append path onto the basedir
// 
const fromBase = (...args) => path.join(basedir, ...args);

// 
// Where all the frontend lives
// 
const webdir = fromBase('web');

// 
// Where the views live
// 
const viewsdir = path.join(webdir, 'views');

module.exports = { basedir, webdir, viewsdir, fromBase }