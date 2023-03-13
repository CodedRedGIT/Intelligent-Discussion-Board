import React from "react";
import { Link } from "react-router-dom";
const ListItem = ({ question }) => {
  return (
    <Link to={`/questions/${question.id}`}>
      <h3>{question.prompt}</h3>
      <small>{question.tag}</small>
    </Link>
  );
};

export default ListItem;
