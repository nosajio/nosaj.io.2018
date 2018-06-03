const axios = require('axios');
const { log, error } = require('../logging')('nosaj-api-service');
const nosajApiUrl = require('constants/urls').nosajApi;

const getEndpointUrl = (path) => `${nosajApiUrl}/${path}`;

const getPost = slug => { }

const getPosts = async () => {
  const postsEndpoint = getEndpointUrl('posts')
  const posts = await axios.get(postsEndpoint);
  return posts.data;
}

module.exports = { getPosts, getPost }