module.exports = status => {
  switch (status) {
    case 500: return require('./500')();
    default: return require('./500')();
  }
}