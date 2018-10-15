const validate = (field, value) => {
  switch (field) {
    case 'firstName':
      return getFirstNameValidation(value);
    case 'lastName':
      return getLastNameValidation(value);
    case 'email':
      return getEmailValidation(value);
  }
  return '';
};

const validateForm = form => {
  const fieldsToValidate = ['firstName', 'lastName', 'email'];
  const errors = fieldsToValidate
    .map(field => ({ field, error: validate(field, form[field]) }))
    .filter(e => e.error !== '');

  return errors;
};

const getFirstNameValidation = firstName =>
  getRequiredFieldValidation(firstName, 'First name is required.');

const getLastNameValidation = lastName =>
  getRequiredFieldValidation(lastName, 'Last name is required.');

const getEmailValidation = email => {
  const emailRequiredError = getRequiredFieldValidation(email, 'Email is required.');

  if (!emailRequiredError) {
    // eslint-disable-next-line
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email.toLowerCase()) ? '' : 'Invalid email address.';
  }

  return emailRequiredError;
};

const getRequiredFieldValidation = (field, errorMsg) => {
  if (field === undefined || field === null || field.trim() === '') {
    return errorMsg;
  }

  return '';
};

export { validate, validateForm };
