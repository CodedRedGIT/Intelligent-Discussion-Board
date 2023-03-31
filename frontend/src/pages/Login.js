import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); // get history object from react-router-dom

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setEmail("");
    setPassword("");
  };

  function handleLogin() {
    const data = {
      email: email,
      password: password,
    };
    return axios
      .post("/api/login/", data)
      .then((response) => {
        const memberData = response.data;
        console.log(memberData);
        sessionStorage.setItem("token-id", memberData.id);
        sessionStorage.setItem("token-email", memberData.user.email);
        // Handle successful login
        history.push("/dashboard"); // redirect to /dashboard page
        return response;
      })
      .catch((error) => {
        let message = error.response.data.error;
        alert(message);
      });
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Log In</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
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
        <button className="loginBtn">Sign In</button>
      </form>
      <h3>Don't have an account?&nbsp;</h3>
      <Link to="/register">Register</Link>
      {/* <LoginForm /> */}
    </div>
  );
};

export default Login;
