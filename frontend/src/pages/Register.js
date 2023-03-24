import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Password doesn't match");
      return false;
    } else history.push("/");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  return (
    <div className="register">
      <h1 className="registerTitle">Register</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          required
          placeholder="Email Address"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          minLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password2">Re-type Password</label>
        <input
          required
          placeholder="Re-type Password"
          type="password"
          name="password2"
          id="password2"
          minLength="6"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button className="registerBtn">Submit</button>
      </form>
    </div>
  );
};
export default Register;
