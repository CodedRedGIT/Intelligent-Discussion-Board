import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Password doesn't match");
      return false;
    }
    try {
      const response = await axios.post("/api/members/create/", {
        email,
        password,
      });
      console.log(response.data);
      setEmail("");
      setPassword("");
      setPassword2("");
      history.push("/");
    } catch (error) {
      let message = error.response.data.error;
      console.log(error.response.data);
      alert(message);
    }
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
