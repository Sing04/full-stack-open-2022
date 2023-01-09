
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
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
    const anecdoteVoted = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(newVote(id, {...anecdoteVoted, votes: anecdoteVoted.votes + 1}))
    dispatch(setNotification(`You voted '${anecdoteVoted.content}'`, 5))
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