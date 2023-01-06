import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const sortedAnecdotes = [...anecdotes].sort(function(a, b) {
    if (a.votes > b.votes) {
      return -1
    } else if (a.votes < b.votes){
      return 1
    } else {
      return 0
    }
  })

  const dispatch = useDispatch()
 
  const vote = (id) => {
    dispatch(addVote(id))
    const anecdoteVoted = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(createNotification(`You voted '${anecdoteVoted.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())}, 5000)
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            vote(anecdote.id)
          }}
        />
      )}
    </div>
  )
}

export default AnecdoteList