const axios = require('axios');
const { log, error } = require('../logging')('nosaj-api-service');
const nosajApiUrl = require('constants/urls').nosajApi;
const Cache = require('../utils/memory-cache');

// Configure the cache for posts data
const postsCache = new Cache({
  expires: Cache.minsToMs(15)
});

const getEndpointUrl = (path) => `${nosajApiUrl}/${path}`;

const getPosts = async () => {
  try {
    const postsEndpoint = getEndpointUrl('posts')
    const fromCache = postsCache.get(postsEndpoint);
    if (fromCache) {
      log('Get posts from cache');
      return fromCache;
    }
    const posts = await axios.get(postsEndpoint);
    log('Get posts from %s', postsEndpoint);
    postsCache.set(postsEndpoint, posts.data);
    return posts.data;
  } catch (err) {
    throw err;
  }
}

const findPost = (slug, posts=[]) => posts.find(p => p.slug === slug);

const getPost = async slug => {
  try {
    const posts = await getPosts();
    return findPost(slug, posts);
  } catch(err) {
    throw err;
  }
}

module.exports = { getPosts, getPost, findPost }