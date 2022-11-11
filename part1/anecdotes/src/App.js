import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => (<p>has {props.count} votes</p>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(7))

  const handlePoints = () => {
    const copy = { ...points}
    
    copy[selected] += 1

    setPoints(copy)

  }

  return (
    <div>
      {anecdotes[selected]}
      <Statistics count={points[selected]} />
      <div>
        <Button handleClick={() => handlePoints()} text='vote' />
        <Button handleClick={() => setSelected(Math.floor(Math.random() * 7))} text='next anecdote'/>
      </div>
    </div>
  )
}

export default App
