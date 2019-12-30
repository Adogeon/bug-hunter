import React, { useState } from "react";

const LogIn = () => {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(values);
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
        console.log(response);
        if (response.status === 200) {
          window.location.assign("/");
        }
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
      <label htmlFor="passwordInput">Password:</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        value={values.password}
        onChange={handleInputChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LogIn;
