import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const data = {
      email: email,
      password: password
    };
    axios.post('/api/login/', data)
      .then(response => {
        console.log(response.data);
        // Handle successful login
      })
      .catch(error => {
        console.log(error.response.data);
        // Handle login error
      });
  }

  function LoginForm() {
    function handleSubmit(event) {
      event.preventDefault();
      handleLogin();
    }
  
    return (
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="email">Email Address</label>
          <input
            required
            className="formControl"
            placeholder="Email Address"
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
              required
              className="formControl"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

        </div>
        <button className="loginBtn">Sign In</button>
      </form>
    );
  }
  
  return (
    <div className="login">
      <h1 className="loginTitle">Log In</h1>
      <LoginForm />
      <h3 className="loginSubtitle">Don't have an account?&nbsp;<Link to="/register">Register</Link></h3>
    </div>
  );
}

export default Login;