import React, { useState } from "react";
import axios from "axios";

const ReplyForm = ({ postId }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tokenInfo = sessionStorage.getItem("token-id");
    console.log(tokenInfo);
    try {
      const response = await axios.post(
        `/api/posts/${postId}/replies/create/`,
        {
          prompt: prompt,
          member_id: tokenInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token-id")}`,
          },
        }
      );

      if (response.status === 201) {
        setPrompt("");
        window.location.reload();
      } else {
        console.error("Failed to create reply");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="reply-prompt">Reply:</label>
        <textarea
          className="form-control"
          id="reply-prompt"
          rows="3"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ReplyForm;
