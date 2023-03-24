import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";

const QuestionListPage = () => {
  let [questions, setQuestions] = useState([]);
  const history = useHistory();

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
      <button
        className="createThread"
        onClick={() => {
          history.push("/create-thread");
        }}
      >
        Create a Thread
      </button>
      <div className="thread__container">
        {questions.map((question, index) => (
          <div className="thread__item" key={index}>
            <ListItem question={question} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionListPage;
