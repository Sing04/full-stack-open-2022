import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.sort(function(a, b) {
    if (a.votes > b.votes) {
      return -1
    } else if (a.votes < b.votes){
      return 1
    } else {
      return 0
    }
  }))
  const dispatch = useDispatch()
 
  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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