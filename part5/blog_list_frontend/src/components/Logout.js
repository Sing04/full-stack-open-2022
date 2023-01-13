import { removeUser } from '../reducers/loginUserReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const handleLogout = (event) => {
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogappUser')
    navigate('/login')
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout