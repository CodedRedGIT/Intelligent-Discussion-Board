import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    history.push("/dashboard");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Log In</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          required
          placeholder="Email Address"
          type="text"
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
        <button className="loginBtn">Sign In</button>
      </form>
      <h3>Don't have an account?&nbsp;</h3>
      <Link to="/register">Register</Link>
    </div>
  );
};
export default Login;
