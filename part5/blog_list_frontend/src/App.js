import { useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginUserReducer'
import { Link, Routes, Route } from 'react-router-dom'
import Logout from './components/Logout'

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

  const padding = {
    paddingRight: 8
  }

  return (
    <div className='container'>
      <div>
        {user &&
          <div>
            <Link style={padding} to='/'>Blogs</Link>
            <Link style={padding} to='/users'>Users</Link>
            <em style={{ fontStyle: 'italic' }}>{user.name} logged in </em> <Logout />
          </div>
        }
      </div>
      <Notification />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<Users /> } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
