import { useState } from 'react'

const Title = props => <h1>{props.value}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => <p>{props.text} {props.value} {props.sign}</p>

const Statistics = (props) => (
  <div>
    <StatisticLine text='good' value={props.statistics[0]} />
    <StatisticLine text='neutral' value={props.statistics[1]} />
    <StatisticLine text='bad' value={props.statistics[2]} />
    <StatisticLine text='all' value={props.statistics[3]} />
    <StatisticLine text='average' value={props.statistics[4]} />
    <StatisticLine text='positive' value={props.statistics[5]} sign='%'/> 
  </div>
)    


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad 

  if (all !== 0){
    const average = (good * 1 + bad * -1) / all
    const positive = (good / all) * 100
    const statistics = [good, neutral, bad, all, average, positive]
    return(
      <div>
        <Title value='give feedback' />
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
        <Title value='statistics' />
        <Statistics statistics={statistics} />
      </div>
    )
  } else{
    return(
      <div>
        <Title value='give feedback' />
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
        <Title value='statistics' />
        <p>No feedback given</p>
      </div>
    )  
  }
}

export default App
