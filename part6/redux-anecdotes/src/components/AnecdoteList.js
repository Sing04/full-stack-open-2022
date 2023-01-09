
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ anecdotes, filters }) => {
    if (filters === '' ) {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filters.toLowerCase()))
    }
  })

  const sortedAnecdotes = [...anecdotes].sort(function(a, b) {
    if (a.votes > b.votes) {
      return -1
    } else if (a.votes < b.votes){
      return 1
    } else {
      return 0
    }
  })
 
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