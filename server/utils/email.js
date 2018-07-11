
/**
 * A mostly fool proof way to validate an email address string with a 
 * simple regex
 * @param {String} test
 * @return {Boolean} valid
 */

exports.validateEmail = test => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(test).toLowerCase());
}

/**
 * Take data and create an email string from it.
 * @param {String} subject
 * @param {String} replyTo
 * @param {String} message
 */

exports.composeMessage = ({
  subject,
  replyTo,
  message
}) => `
New message from nosaj.io/contact\n\n
Date: ${new Date()}\n
From: ${replyTo}\n
Subject: ${subject}\n
~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n\n
${message}`;
