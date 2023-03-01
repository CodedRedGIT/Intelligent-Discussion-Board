import React, {useState, useEffect} from 'react'

const QuestionPage = ({match}) => {

    let questionId = match.params.id
    let [question, setQuestion] = useState(null)

    useEffect(()=> {
        getQuestion()
    }, [questionId])

    let getQuestion = async()=>{
        let response = await fetch(`/api/questions/${questionId}/`)
        let data = await response.json()
        setQuestion(data)
    }

    return(
        <div>
            <div>{question?.prompt}</div>
        </div>
    )
}

export default QuestionPage