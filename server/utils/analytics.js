const package = require('../../package.json');

/**
 * @returns {Fuction}
 */
exports.composeWithExperiment = (page, experimentName) => (view) => ({
  ...view,
  experimentJs: `window.addEventListener('load', function() { 
    if (! gtag) return console.log('gtag not loaded');
    gtag('event', 'hit', {
      'event_category': 'experiments',
      'event_label': '${page}',
      'value': '${experimentName}'
    });
  });`
});