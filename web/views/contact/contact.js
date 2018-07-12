import axios from 'axios';
import { el } from 'utils/helpers';

const sendContactForm = postdata => axios.post('/email', postdata);

const contactPage = () => {

  /**
   * Reference to elements
   */
  
  const $form = el('form[name="email-form"]');

  // These are the elements to highlight when running validations
  const validationElements = {
    $subject: $form.querySelector('.email-subject'),
    $replyTo: $form.querySelector('.email-reply-to'),
    $message: $form.querySelector('.email-body'),
  }

  /**
   * Mark validationElements invalid based on fields array.
   * @param {String[]} fields Names of the fields to mark
   */
  const markInvalidFields = fields => {
    const invalidClassName = 'invalid-field';
    // Reset all fields before running the validation
    Object.values(validationElements).forEach($el => $el.classList.remove(invalidClassName));
    // Validate passed fields
    if (! fields || ! fields.length) return;
    setTimeout(() => {
      fields.forEach(field => {
        if (! Object.keys(validationElements).includes(`$${field}`)) return;
        validationElements[`$${field}`].classList.add(invalidClassName);
      });
    }, 20);
  }
  
  
  /**
   * Change DOM to 'failed' state. This is only for errors.
   * @param {Object} postdata Data received from the client
   * @param {Object} serverResponse Koa response object
   */
  const updateDomOnFail = (postdata, serverResponse) => {
    const $fail = el('.email-fail');
    $fail.classList.remove('hidden');
  }
  
  
  /**
   * Change the dom to the 'invalid' state
   * @param {Object} response 
   */
  const updateDomOnInvalid = response => {
    const fields = response.data.invalid;
    const $invalid = el('.email-invalid');
    $invalid.classList.remove('hidden');
    markInvalidFields(fields);
  }


  /**
   * Change the DOM to the 'success' state
   */
  const updateDomOnSuccess = () => {
    $form.classList.add('hidden');
    const $success = el('.email-success');
    $success.classList.remove('hidden');
  }
  

  /**
   * Handle email form submit
   * @param {Event} e Event from submit handler
   */
  const handleFormSubmit = e => {
    e.preventDefault();
    const data = {
      subject: $form.querySelector('input[name="subject"]').value,
      replyTo: $form.querySelector('input[name="replyTo"]').value,
      message: $form.querySelector('textarea[name="message"]').value,
    }
    sendContactForm(data)
      .then( () => updateDomOnSuccess() )
      .catch(err => 
        err.response.data.invalid ? 
          updateDomOnInvalid(err.response)
          : updateDomOnFail(data, err.response)
      );
  }
  
  $form.addEventListener('submit', e => handleFormSubmit(e));
}



window.onload = contactPage;