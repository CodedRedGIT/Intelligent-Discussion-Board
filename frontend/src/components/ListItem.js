import React from "react";
import { Link } from "react-router-dom";
const ListItem = ({ post }) => {
  const date = post.published_date.substring(0, 10);
  const time = post.published_date.substring(11, 16);

  return (
    <Link to={`/posts/${post.id}`}>
      <h3>{post.prompt}</h3>
      <div className="thread__info">
        <small>{post.tag}</small>
        <small>{date}</small>
        <small>{time}</small>
      </div>
    </Link>
  );
};

export default ListItem;
