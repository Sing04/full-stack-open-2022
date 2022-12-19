import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    color: 'white'
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
      <Notification message={notificationMessage} />
      {user === null
      ? <Login setUser={setUser} setNotificationMessage={setNotificationMessage} />
      : <div>
          <div>
            <h2>Blogs</h2>
            <p style={{fontStyle: 'italic'}}>{user.name} logged in </p>
            <Logout setUser={setUser} />
          </div>
          <div>
            <NewBlogForm blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} />
          </div>
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App
