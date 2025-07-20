import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const FeedbackCount = ({ count, text }) => <div>{text} {count}</div>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = ( { good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      <FeedbackCount count={good} text='good' />
      <FeedbackCount count={neutral} text='neutral' />
      <FeedbackCount count={bad} text='bad' />
      <FeedbackCount count={good + neutral + bad} text='total' />
      <FeedbackCount count={((good - bad) / (good + neutral + bad) || 0).toFixed(2)} text='average' />
      <FeedbackCount count={(good / (good + neutral + bad) * 100 || 0).toFixed(2) + '%'} text='positive' />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text='give feedback' />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App