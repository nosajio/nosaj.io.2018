const package = require('../../package.json');

/**
 * @returns {Fuction}
 */
exports.composeWithExperiment = (page, experimentName) => (view) => ({
  ...view,
  experimentJs: `window.addEventListener('load', function() { 
    if (! ga) return console.log('ga not loaded');
    ga('send', {
      hitType: 'event',
      eventCategory: 'Experiments',
      eventAction: '${page}',
      eventLabel: '${experimentName}'
    });
  });`
});