/**
 * 
 * @param {Number} expires The global expires value
 * @param {*} value Thing to cache
 * @returns {Object}
 */
const cacheValue = (expires, value) => ({
  expires: MemoryCache.getDateAfter(expires),
  value
});


class MemoryCache {
  constructor(options={}) {
    this._expires = options.expires || MemoryCache.minsToMs(10);
    this._cache = new Map();
  }

  /**
   * Return the whole cache (clears out expired items first)
   * @returns {Object[]} cached items
   */
  cache() {
    if (this._cache.size === 0) {
      return [];
    }
    this.deleteExpired();
    const fullCache = this._cache.entries();
    const preparedCache = Array.from(fullCache).map(([key, entry]) => ({
      key,
      ...entry
    }));
    return preparedCache;
  }

  /**
   * Add or replace an item in the cache
   * @param {String} key 
   * @param {*} value A thing to cache
   */
  set(key, value) {
    if (this._cache.has(key)) {
      this._cache.delete(key);
    }
    this._cache.set(key, cacheValue(this._expires, value));
  }
  
  /**
   * Get something from the cache safely. Will return null for misses.
   * @param {String} key The name of the cached item
   */
  get(key) {
    this.deleteExpired();
    if (! this._cache.has(key)) {
      return undefined;
    } 
    const hit = this._cache.get(key);
    return hit ? hit.value : undefined;
  }


  /**
   * Delete all entries from the cache that are past their expiry time
   */
  deleteExpired() {
    this._cache.forEach((item, key) => {
      if (MemoryCache.timeDelta(item.expires) === 0) {
        this.delete(key);
      }
    });
  }


  /**
   * Delete an item from the cache
   * @param {String} key 
   * @returns {*} value
   */
  delete(key) {
    const cached = this._cache.get(key);
    const deleteOp = this._cache.delete(key);
    return deleteOp ? cached.value : undefined;
  }
  

  /**
   * Converts a minutes value into ms. Useful for working with expires times
   * @param {Number} minutes 
   */
  static minsToMs(minutes) {
    return minutes * 60 * 1000;
  }


  /**
   * How long between two times?
   * @param {Date} until A time in the future
   * @param {Date} from The start time 
   * @return {Number} ms
   */
  static timeDelta(until, from = new Date()) {
    const delta = until.getTime() - from.getTime();
    return delta < 0 ? 0 : delta;
  }


  /**
   * Add ms to a date then return new Date
   * @param {Number} ms Number of ms to add to date
   * @param {Date} start? The starting date (default is now)
   */
  static getDateAfter(ms, start = new Date()) {
    const startMs = start.getTime();
    const endMs = startMs + ms;
    return new Date(endMs);
  }
}

module.exports = MemoryCache;