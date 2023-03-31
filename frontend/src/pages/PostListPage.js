import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
import { useHistory, Redirect } from "react-router-dom";

const PostListPage = () => {
  let [posts, setPosts] = useState([]);
  const history = useHistory();
  let isLogged = sessionStorage.getItem("token-email");

  useEffect(() => {
    getPosts();
  }, []);

  let getPosts = async () => {
    let response = await fetch("/api/posts/");
    let data = await response.json();
    setPosts(data);
  };
  if (!isLogged) {
    return <Redirect from="/dashboard" to="/" />;
  } else {
    return (
      <div>
        <Navbar />
        <button
          className="createThread"
          onClick={() => {
            history.push("/create-post");
          }}
        >
          Create a Post
        </button>
        <div className="thread__container">
          {posts.map((post, index) => (
            <div className="thread__item" key={index}>
              <ListItem post={post} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default PostListPage;
