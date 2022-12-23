import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => {
  if (text === 'positive'){
    value += ' %'
  }
 
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
  
}

const Statistics = ({good, neutral, bad}) => {
  if(good === 0 && neutral === 0 && bad === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
  <>
    <table>
      <tbody>
        <StatisticLine text = 'good' value={good}/>
        <StatisticLine text = 'neutral' value={neutral}/>
        <StatisticLine text = 'bad' value={bad}/>
        <StatisticLine text = 'all' value={good + neutral + bad}/>
        <StatisticLine text = 'average' value={(good - bad) / (good + neutral + bad)}/>
        <StatisticLine text = 'positive' value={good / (good + neutral + bad) * 100}/>
      </tbody>
    </table>    
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text = 'give feedback' />
      <Button onClick={() => setGood(good + 1)} text = "good" />
      <Button onClick={() => setNeutral(neutral + 1)} text = "neutral" />
      <Button onClick={() => setBad(bad + 1)} text = "bad" />
      <Header text = 'statistics' />  
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </>
  )
}

export default App