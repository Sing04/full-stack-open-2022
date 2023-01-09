
import { connect } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = (props) => {

  const vote = (id) => {
    const anecdoteVoted = props.anecdotes.find(anecdote => anecdote.id === id)
    props.newVote(id, {...anecdoteVoted, votes: anecdoteVoted.votes + 1})
    props.setNotification(`You voted '${anecdoteVoted.content}'`, 5)
  }

  return (
    <div>
      {[...props.anecdotes].sort(function(a, b) {
        if (a.votes > b.votes) {
          return -1
        } else if (a.votes < b.votes){
          return 1
        } else {
          return 0
        }
        }).map(anecdote =>
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

const mapStateToProps = (state) => {
  if (state.filters === '' ) {
    return {
      anecdotes: state.anecdotes
    }
  } else {
    return {
      anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filters.toLowerCase()))
    }
  }
}

const mapDispatchToProps = {
  newVote,
  setNotification
}
const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList