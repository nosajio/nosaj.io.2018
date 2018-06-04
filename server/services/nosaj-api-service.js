const axios = require('axios');
const { log, error } = require('../logging')('nosaj-api-service');
const nosajApiUrl = require('constants/urls').nosajApi;

const getEndpointUrl = (path) => `${nosajApiUrl}/${path}`;

const getPost = async slug => { 
  const postEndpoint = getEndpointUrl(`posts/${slug}`);
  const post = await axios.get(postEndpoint);
  return post.data;
}

const getPosts = async () => {
  const postsEndpoint = getEndpointUrl('posts')
  const posts = await axios.get(postsEndpoint);
  return posts.data;
}

module.exports = { getPosts, getPost }