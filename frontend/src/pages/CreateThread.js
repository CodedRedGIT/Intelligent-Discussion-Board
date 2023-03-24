import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateThread = () => {
  const [threadPrompt, setThreadPrompt] = useState("");
  const [threadBody, setThreadBody] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setThreadPrompt("");
    setThreadBody("");
    alert("Thread Created");
    history.push("/dashboard");
  };

  return (
    <div>
      <Navbar />
      <form className="homeForm" onSubmit={handleSubmit}>
        <div className="home__container">
          <h3 style={{ marginBottom: 3 }}>Thread Prompt</h3>
          <input
            required
            className="modalInput"
            type="text"
            name="threadPrompt"
            value={threadPrompt}
            onChange={(e) => setThreadPrompt(e.target.value)}
          />
          <h4 style={{ marginBottom: 3 }}>Description</h4>
          <textarea
            required
            rows={8}
            className="modalInput"
            type="text"
            name="threadBody"
            value={threadBody}
            onChange={(e) => setThreadBody(e.target.value)}
          />
          <button className="loginBtn">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default CreateThread;
