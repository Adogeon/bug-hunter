import React, { useState } from "react";

const LogIn = () => {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleSubmit = event => {
    event.preventDefault();
    alert(`${values.email} and ${values.password} has been submit`);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LogIn;
