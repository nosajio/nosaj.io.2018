/**
 * ViewExperiment takes an array of view locations and returns a view at random.
 * This is useful for running A/B typed experiments to compare success rates.
 */
module.exports = class ViewExperiment {
  /**
   * Constructor
   * @param {Function[]} fns All the render functions 
   */
  constructor(fns=[]) {
    this._fns = fns;
  }


  /**
   * Render the page (or, run a function at random)
   */
  async render() {
    const run = this.randomFn();
    return await run();
  }


  randomFn() {
    const fnsCount = this._fns.length - 1;
    const randomNumber = Math.round(Math.random() * fnsCount);
    return this._fns[randomNumber];
  }
}