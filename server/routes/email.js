const sgmail = require('@sendgrid/mail');
const striptags = require('striptags');
const { validateEmail, composeMessage } = require('../utils/email.js');
const { log, error } = require('server/logging')('routes:email');

// Configure sendgrid mailer
sgmail.setApiKey( process.env.SENDGRID_KEY );


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

const jsonInvalid = (response, fields) => {
  response.status = 400;
  response.body = {
    sent: false,
    invalid: fields
  }
}

/**
 * Check if fields are populated
 * @param {Array} fields A list of field names to look for
 * @param {Object} body The body object from the client
 */
const validateFields = (fields, body) => {
  const invalidFields = fields.reduce((acc, f) => {
    const field = body[f];
    if (! field || field === '') {
      acc.push(f);
    }
    return acc;
  }, []);
  return invalidFields;
}


module.exports = async (ctx, next) => {
  const { request, response } = ctx;

  const { body } = request;
  
  // Validate request data

  const invalidFields = validateFields(['replyTo', 'message', 'subject'], body);
  if (invalidFields.length) {
    return jsonInvalid(response, invalidFields);
  }
  
  if (! validateEmail(body.replyTo)) {
    return jsonInvalid(response, ['replyTo']);
  }

  // Clean out any funny business ~_^
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