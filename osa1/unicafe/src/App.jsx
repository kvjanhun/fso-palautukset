import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const FeedbackCount = ({ count, text }) => <div>{text} {count}</div>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good - bad) / total || 0
  const positive = (good / total) * 100 || 0

  return (
    <>
      <Header text='give feedback' />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Header text='statistics' />
      <FeedbackCount count={good} text='good' />
      <FeedbackCount count={neutral} text='neutral' />
      <FeedbackCount count={bad} text='bad' />
      <FeedbackCount count={total} text='total' />
      <FeedbackCount count={average.toFixed(2)} text='average' />
      <FeedbackCount count={positive.toFixed(2) + '%'} text='positive' />
    </>
  )
}

export default App