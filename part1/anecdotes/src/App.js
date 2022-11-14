import { useState } from 'react'

const Title = props => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => (<div>has {props.count} votes</div>)

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
  const [mostPoints, setMostPoints] = useState(selected)

  const handlePoints = () => {
    const copy = [ ...points]
    copy[selected] += 1

    setPoints(copy)

    let highest_points = 0

    for (let i = 0; i < copy.length; i++){
      if (copy[i] > copy[highest_points]){
        highest_points = i
      }
    }
    setMostPoints(highest_points)
  }  
  
  return (
    <div>
      <div>
        <Title text='Anecdote of the day' />
        {anecdotes[selected]}
        <Statistics count={points[selected]} />
      </div>
      <div>
        <Button handleClick={() => handlePoints()} text='vote' />
        <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote'/>
      </div>
      <div>
        <Title text='Anecdote with most votes' />
        {anecdotes[mostPoints]}
        <Statistics count={points[mostPoints]} />
        </div>
    </div>
  )
}

export default App
