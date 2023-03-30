import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";

const PostPage = ({ match }) => {
  let postId = match.params.id;
  let [post, setPost] = useState(null);
  let isLogged = sessionStorage.getItem("token-info");

  useEffect(() => {
    getPost();
  }, [postId]);

  let getPost = async () => {
    let response = await fetch(`/api/posts/${postId}/`);
    let data = await response.json();
    setPost(data);
  };

  let date = post?.published_date.substring(0, 10);
  let time = post?.published_date.substring(11, 16);

  if (!isLogged) {
    return <Redirect from="/posts/:id" to="/" />;
  } else {
    return (
      <div>
        <Navbar />
        <div className="thread__container">
          <div className="thread__item">
            <h3>{post?.prompt}</h3>
            <div className="thread__info">
              <small>{post?.tag}</small>
              <small>{date}</small>
              <small>{time}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PostPage;
