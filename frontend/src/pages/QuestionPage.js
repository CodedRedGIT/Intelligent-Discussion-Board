import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";

const QuestionPage = ({ match }) => {
  let questionId = match.params.id;
  let [question, setQuestion] = useState(null);
  let isLogged = sessionStorage.getItem("token-info");

  useEffect(() => {
    getQuestion();
  }, [questionId]);

  let getQuestion = async () => {
    let response = await fetch(`/api/questions/${questionId}/`);
    let data = await response.json();
    setQuestion(data);
  };

  let date = question?.published_date.substring(0, 10);
  let time = question?.published_date.substring(11, 16);

  if (!isLogged) {
    return <Redirect from="/questions/:id" to="/" />;
  } else {
    return (
      <div>
        <Navbar />
        <div className="thread__container">
          <div className="thread__item">
            <h3>{question?.prompt}</h3>
            <div className="thread__info">
              <small>{question?.tag}</small>
              <small>{date}</small>
              <small>{time}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default QuestionPage;
