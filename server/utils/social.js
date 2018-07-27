const twitterShareUrl = (text, url) => `https://twitter.com/intent/tweet?text="${text}"&url=${url}`;

const facebookShareUrl = (text, url) => `https://www.facebook.com/sharer/sharer.php?quote="${text}"&href=${url}`;

module.exports = { twitterShareUrl, facebookShareUrl }