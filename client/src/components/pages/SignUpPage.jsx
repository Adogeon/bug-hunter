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

    const response = await fetch(`/api/signup`, {
      method: "post",
      body: {
        username: values.username,
        email: values.email,
        password: values.confirmPassword
      }
    });

    if (response.status === 200) {
      location.assign("/login");
    }
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
