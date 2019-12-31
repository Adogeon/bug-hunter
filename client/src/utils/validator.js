const isEmpty = string => string.trim() === "";

const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(emailRegEx);
};

exports.validateSignUpData = data => {
  const errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) {
    errors.password = "Must not be empty";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  if (isEmpty(data.username)) {
    errors.username = "Must not be empty";
  }

  return {
    errors,
    errValid: Object.keys(errors).length > 0
  };
};

exports.validateLoginData = data => {
  const errors = {};

  if (isEmpty(data.username)) {
    errors.username = "Must not be empty";
  }

  if (isEmpty(data.password)) {
    errors.password = "Must not be empty";
  }

  return {
    errors,
    errValid: Object.keys(errors).length > 0
  };
};
