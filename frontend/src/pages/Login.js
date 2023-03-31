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
    //sessionStorage.setItem("token-info", email);
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
        sessionStorage.setItem("token-info", email);
        // Handle successful login
        history.push("/dashboard"); // redirect to /dashboard page
        return response;
      })
      .catch((error) => {
        let message = error.response.data.error;
        alert(message);
      });
  }

  //   function LoginForm() {
  //     function handleSubmit(event) {
  //       event.preventDefault();
  //       handleLogin();
  //     }

  //     return (
  //       <form className="loginForm" onSubmit={handleSubmit}>
  //         <div className="formGroup">
  //           <label htmlFor="email">Email Address</label>
  //           <input
  //             required
  //             className="formControl"
  //             placeholder="Email Address"
  //             type="text"
  //             name="email"
  //             id="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //         </div>
  //         <div className="formGroup">
  //           <label htmlFor="password">Password</label>
  //           <input
  //             required
  //             className="formControl"
  //             placeholder="Password"
  //             type="password"
  //             name="password"
  //             id="password"
  //             minLength="6"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //         </div>
  //         <button className="loginBtn">Sign In</button>
  //       </form>
  //     );
  //   }

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
