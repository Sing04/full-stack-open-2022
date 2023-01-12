import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Logout from './components/Logout'
import Toggable from './components/Toggable'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'


const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification />
      {user === null
        ? <Login setUser={setUser} />
        : <div>
          <div>
            <h2>Blogs</h2>
            <p style={{ fontStyle: 'italic' }}>{user.name} logged in </p>
            <Logout setUser={setUser} />
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
