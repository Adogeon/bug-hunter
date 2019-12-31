import React, { useState } from "react";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async event => {
    event.preventDefault();

    fetch(`/api/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: values.username,
        password: values.confirmPassword
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
      <label htmlFor="emailInput">Email:</label>
      <input
        type="text"
        name="email"
        id="emailInput"
        value={values.email}
        onChange={handleInputChange}
      />
      <label htmlFor="passwordInput">Password:</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        value={values.password}
        onChange={handleInputChange}
      />
      <label htmlFor="confirmPasswordInput">Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPasswordInput"
        value={values.confirmPassword}
        onChange={handleInputChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignUp;
