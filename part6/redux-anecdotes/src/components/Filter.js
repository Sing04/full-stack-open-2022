import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    props.filterAnecdotes(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = {
  filterAnecdotes
}

const ConnectedFilter = connect (mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter