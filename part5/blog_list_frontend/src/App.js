import { useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginUserReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const user = useSelector(state => state.loginUser)

  return (
    <div className='container'>
      <Notification />
      {user === null
        ?<Login />
        :<div>
          <BlogList />
          <Users />
        </div>
      }
    </div>
  )
}

export default App
