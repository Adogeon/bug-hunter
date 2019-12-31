import React, { useState } from "react";
import { validateSignUpData } from "../../utils/validator";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    const { errValid, errors } = validateSignUpData(values);
    if (errValid) {
      console.error(errors);
      return setError(errors);
    }

    fetch(`/api/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: values.username,
        password: values.confirmPassword,
        email: values.email
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        window.location.assign(data.redirectURL);
      })
      .catch(err => {
        if (err);
        console.error(err);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="usernameInput">Username:</label>
      <input
        type="text"
        name="username"
        id="usernameInput"
        value={values.username}
        onChange={handleInputChange}
      />
      {error && error.username && <div>{error.username}</div>}
      <label htmlFor="emailInput">Email:</label>
      <input
        type="text"
        name="email"
        id="emailInput"
        value={values.email}
        onChange={handleInputChange}
      />
      {error && error.email && <div>{error.email}</div>}
      <label htmlFor="passwordInput">Password:</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        value={values.password}
        onChange={handleInputChange}
      />
      {error && error.password && <div>{error.password}</div>}
      <label htmlFor="confirmPasswordInput">Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPasswordInput"
        value={values.confirmPassword}
        onChange={handleInputChange}
      />
      {error && error.confirmPassword && <div>{error.confirmPassword}</div>}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignUp;
