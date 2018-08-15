const package = require('../../package.json');

/**
 * @returns {Fuction}
 */
exports.composeWithExperiment = (page, experimentName) => (view) => ({
  ...view,
  experimentJs: `ga('send', {
    hitType: 'event',
    eventCategory: 'Experiments',
    eventAction: '${page}',
    eventLabel: '${experimentName}'
  });`
});