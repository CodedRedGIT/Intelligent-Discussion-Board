import React, {useState, useEffect} from 'react'
import ListItem from "../components/ListItem";

const QuestionListPage = () => {

    let [questions, setQuestions] = useState([])

    useEffect(() => {
        getQuestions()
    }, [])

    let getQuestions = async () => {
        let response = await fetch('/api/questions/')
        let data = await response.json()
        console.log(data)
        setQuestions(data)
    }

    return(
        <div>
            <div className="question-list">
                {questions.map((question, index) => (
                    <ListItem key={index} question={question}/>
                ))}
            </div>
        </div>
    )
}

export default QuestionListPage