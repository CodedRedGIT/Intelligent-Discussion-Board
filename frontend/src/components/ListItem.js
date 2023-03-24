import React from "react";
import { Link } from "react-router-dom";
const ListItem = ({ question }) => {
  const date = question.published_date.substring(0, 10);
  const time = question.published_date.substring(11, 16);

  return (
    <Link to={`/questions/${question.id}`}>
      <h3>{question.prompt}</h3>
      <div className="thread__info">
        <small>{question.tag}</small>
        <small>{date}</small>
        <small>{time}</small>
      </div>
    </Link>
  );
};

export default ListItem;
