import React, { useState } from "react";
import { validateLoginData } from "../../utils/validator";

const LogIn = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const handleSubmit = event => {
    event.preventDefault();

    const { errValid, errors } = validateLoginData(values);
    if (errValid) {
      console.error(errors);
      return setError(errors);
    }

    fetch(`/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password
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
      <label htmlFor="passwordInput">Password:</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        value={values.password}
        onChange={handleInputChange}
      />
      {error && error.password && <div>{error.password}</div>}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LogIn;
