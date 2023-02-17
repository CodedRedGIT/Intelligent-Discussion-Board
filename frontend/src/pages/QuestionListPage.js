import React, {useState, useEffect} from 'react'

const QuestionListPage = () => {

    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
      let response = await fetch('http://localhost:8000/api/questions/')
        let data = await response.json()
        setNotes(data)
    }

    return(
        <div>
            <h1>Questions</h1>
        </div>
    )
}

export default QuestionListPage