const validate = (field, value) => {
  switch (field) {
    case 'firstName':
      return getFirstNameValidation(value);
    case 'lastName':
      return getLastNameValidation(value);
    case 'email':
      return getEmailValidation(value);
  }
};

const getFirstNameValidation = firstName =>
  getRequiredFieldValidation(firstName, 'First name is required.');

const getLastNameValidation = lastName =>
  getRequiredFieldValidation(lastName, 'Last name is required.');

const getEmailValidation = email => {
  const emailRequiredError = getRequiredFieldValidation(email, 'Email is required.');

  if (!emailRequiredError) {
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

export { validate };
