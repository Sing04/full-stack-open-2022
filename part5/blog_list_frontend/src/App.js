import { useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Logout from './components/Logout'
import Toggable from './components/Toggable'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const user = useSelector(state => state.users)

  return (
    <div>
      <Notification />
      {user === null
        ? <Login />
        : <div>
          <div>
            <h2>Blogs</h2>
            <p style={{ fontStyle: 'italic' }}>{user.name} logged in </p>
            <Logout />
          </div>
          <div>
            <Toggable buttonLabel='New Blog'>
              <NewBlogForm />
            </Toggable>
          </div>
          <BlogList />
        </div>
      }
    </div>
  )
}

export default App
