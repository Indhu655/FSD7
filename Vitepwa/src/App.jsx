import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&type=boolean')
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="app">
      <h1>Trivia Questions</h1>
      {questions.map((q, index) => (
        <div key={index} className="question">
          <p>{q.question}</p>
          <p>Answer: {q.correct_answer}</p>
        </div>
      ))}
    </div>
  )
}

export default App