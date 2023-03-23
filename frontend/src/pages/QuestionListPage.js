import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";

const QuestionListPage = () => {
  let [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  let getQuestions = async () => {
    let response = await fetch("/api/questions/");
    let data = await response.json();
    console.log(data);
    setQuestions(data);
  };

  return (
    <div>
      <Navbar />
      <div className="thread__container">
        {questions.map((question, index) => (
          <div className="thread__item">
            <ListItem key={index} question={question} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionListPage;
