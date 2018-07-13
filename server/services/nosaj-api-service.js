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
  const postsEndpoint = getEndpointUrl('posts')
  const fromCache = postsCache.get(postsEndpoint);
  if (fromCache) {
    return fromCache;
  }
  const posts = await axios.get(postsEndpoint);
  postsCache.set(postsEndpoint, posts.data);
  return posts.data;
}

const getPost = async slug => {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}

module.exports = { getPosts, getPost }