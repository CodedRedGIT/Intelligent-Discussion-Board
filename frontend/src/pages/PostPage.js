import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import RepliesList from "../components/ListReplies";
import ReplyForm from "../components/ReplyForm";

const PostPage = ({ match }) => {
  const postId = match.params.id;
  const [post, setPost] = useState(null);
  const [member, setMember] = useState(null);
  const isLogged = sessionStorage.getItem("token-email");

  useEffect(() => {
    getPost();
  }, [postId]);

  const getPost = async () => {
    try {
      const postResponse = await fetch(`/api/posts/${postId}/`);
      const postData = await postResponse.json();
      setPost(postData);

      const member_id = postData.member_id;
      const memberResponse = await fetch(`/api/members/${member_id}/`);
      const memberData = await memberResponse.json();
      setMember(memberData);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const date = post?.published_date.substring(0, 10);
  const time = post?.published_date.substring(11, 16);

  if (!isLogged) {
    return <Redirect from="/posts/:id" to="/" />;
  } else {
    return (
      <div>
        <Navbar />
        <div className="thread__container">
          <div className="thread__item">
            <h3>{post?.title}</h3>
            <div className="thread__prompt">
              <p>{post?.prompt}</p>
            </div>
            <div className="thread__info">
              <small>{post?.tag}</small>
              <small>{date} </small>
              <small>{time} </small>
              <small>{member?.user.email}</small>
            </div>
          </div>
          <RepliesList postId={postId} />
          <ReplyForm postId={postId} />
        </div>
      </div>
    );
  }
};

export default PostPage;
