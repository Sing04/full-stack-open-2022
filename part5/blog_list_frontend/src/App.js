import { useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginUserReducer'
import { Link, Routes, Route } from 'react-router-dom'
import Logout from './components/Logout'
import { useMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const users = useSelector(state => state.users)

  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  const loginUser = useSelector(state => state.loginUser)

  const padding = {
    paddingRight: 8
  }

  return (
    <div className='container'>
      <div>
        {loginUser &&
          <div>
            <Link style={padding} to='/'>Blogs</Link>
            <Link style={padding} to='/users'>Users</Link>
            <em style={{ fontStyle: 'italic' }}>{loginUser.name} logged in </em> <Logout />
          </div>
        }
      </div>
      <Notification />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<Users /> } />
        <Route path='/users/:id' element={ <User user={user} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
