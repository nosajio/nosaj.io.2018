const sgmail = require('@sendgrid/mail');
const striptags = require('striptags');
const { validateEmail, composeMessage } = require('../utils/email.js');
const { log, error } = require('server/logging')('routes:email');

const jsonError = (response, status, message) => {
  response.status = status;
  response.body = {
    sent: false,
    error: {
      status,
      message,
    }
  }
}

// Configure sendgrid mailer
sgmail.setApiKey( process.env.SENDGRID_KEY );

module.exports = async (ctx, next) => {
  const { request, response } = ctx;

  const { body } = request;
  
  // Validate email request
  
  if (! body || ! body.replyTo || ! body.message || ! body.subject) {
    return jsonError(response, 400, 'Email address, subject, and message must be filled out.');
  }

  if (! validateEmail(body.replyTo)) {
    return jsonError(response, 400, 'That email address doesn\'t look valid.');
  }

  // Clean out any funny business
  body.message = striptags(body.message);

  // Compose message and then send
  
  const message = composeMessage(body);
  sgmail.send({
    to: 'jason@nosaj.io',
    replyTo: body.replyTo,
    from: 'bot@nosaj.io',
    subject: `[${body.subject} – ${body.replyTo}] from nosaj.io`,
    text: message,
  });

  // Respond with an okay

  response.body = { sent: true };
  
}