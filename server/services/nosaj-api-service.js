const axios = require('axios');
const { log, error } = require('../logging')('nosaj-api-service');
const nosajApiUrl = require('constants/urls').nosajApi;

const getEndpointUrl = (path) => `${nosajApiUrl}/${path}`;

const getPost = async slug => { 
  const postEndpoint = getEndpointUrl(`posts`);
  const post = await axios.get(postEndpoint);
  return post.data.find(p => p.slug === slug);
}

const getPosts = async () => {
  const postsEndpoint = getEndpointUrl('posts')
  const posts = await axios.get(postsEndpoint);
  return posts.data;
}

module.exports = { getPosts, getPost }