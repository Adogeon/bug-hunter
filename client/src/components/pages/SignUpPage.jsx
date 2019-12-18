import React, { useState } from "react";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    alert(`${values.email} and ${values.password} has been submit`);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setValues({ ...value, [name]: value });
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
