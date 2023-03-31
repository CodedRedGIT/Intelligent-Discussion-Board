import React, { useState } from "react";

const ReplyForm = ({ postId }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/posts/${postId}/replies/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token-info")}`,
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (response.ok) {
        setPrompt("");
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
