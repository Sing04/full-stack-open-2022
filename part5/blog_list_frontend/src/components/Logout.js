import { removeUser } from '../reducers/loginUserReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const style = {
    marginLeft: 5,
    marginTop: 8,
    padding: 0,
    width: 50,
    height: 25,
  }

  // eslint-disable-next-line no-unused-vars
  const handleLogout = (event) => {
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogappUser')
    navigate('/login')
  }

  return (
    <Button style={style} variant='outline-secondary' size='sm' onClick={handleLogout}>Logout</Button>
  )
}

export default Logout