import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const StatisticsLine = ({ text, count }) => <tr>
                                              <td>{text}</td>
                                              <td>{count}</td>
                                            </tr>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = ( { good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>
  }
  return (
    <table>
      <tbody>
          <StatisticsLine text='good' count={good} />
          <StatisticsLine text='neutral' count={neutral} />
          <StatisticsLine text='bad' count={bad} />
          <StatisticsLine text='total' count={good + neutral + bad} />
          <StatisticsLine text='average' count={((good - bad) / (good + neutral + bad) || 0).toFixed(2)} />
          <StatisticsLine text='positive' count={(good / (good + neutral + bad) * 100 || 0).toFixed(2) + '%'} />
      </tbody>
    </table>
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
      <Statistics good={good} 
                  neutral={neutral} 
                  bad={bad} />
    </>
  )
}

export default App