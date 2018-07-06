// 
// Expose a set of functions that can be used by the beckend to log stuff to 
// the console.
// 

const debug = require('debug');

const error = (section, ...args) => {
  if (section === '') {
    section = 'global';
  }
  const logger = debug(`nosaj:error:${section}`);
  logger(...args);
}

const log = (section, ...args) => {
  if (section === '') {
    section = 'global';
  }
  const logger = debug(`nosaj:${section}`);
  logger(...args);  
}

// Construct reporters for logs and errors
const Constructor = section => ({
  error: (...args) => error(section, ...args),
  log:   (...args) => log(section, ...args),
});

module.exports = Constructor;