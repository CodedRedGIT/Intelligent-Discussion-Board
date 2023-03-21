import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const QuestionPage = ({ match }) => {
  let questionId = match.params.id;
  let [question, setQuestion] = useState(null);

  useEffect(() => {
    getQuestion();
  }, [questionId]);

  let getQuestion = async () => {
    let response = await fetch(`/api/questions/${questionId}/`);
    let data = await response.json();
    setQuestion(data);
  };

  return (
    <div>
      <Navbar />
      <div className="thread__container">
        <div className="thread__item">
          <h3>{question?.prompt}</h3>
          <div className="thread__info">
            <small>{question?.tag}</small>
            <small>{question?.published_date}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
