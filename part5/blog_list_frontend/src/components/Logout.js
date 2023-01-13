import { removeUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Logout = () => {
  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  const handleLogout = (event) => {
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout