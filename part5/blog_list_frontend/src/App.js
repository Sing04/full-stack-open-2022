import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Toggable from './components/Toggable'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import { createNotification } from './reducers/notificationReducer'
import { addBlog, setBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)

  const sortBlogs = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) {
      return 1
    } else if (blog1.likes > blog2.likes) {
      return -1
    } else {
      return 0
    }
  }

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        dispatch(setBlogs(blogs.sort(sortBlogs)))
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

  const handleNewBlog = async (newBlogObject) => {

    try {
      const blog = await blogService.create(newBlogObject)
      dispatch(addBlog(blog))
      dispatch(createNotification(`A new blog ${blog.title} by ${blog.author} added!`, 'green', 5))


    } catch (error) {
      dispatch(createNotification(error.response.data.error, 'red', 5))
    }
  }

  const handleLike = async (blog) => {
    try {

      const updatedBlog = { ...blog, likes: blog.likes + 1 }

      const returnedBlog = await blogService.update(blog.id, updatedBlog)

      //Update blog list with new like
      dispatch(setBlogs((blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog)).sort(sortBlogs)))
      dispatch(createNotification(`You liked: ${blog.title} by ${blog.author}!`, 'green', 5))

    } catch(error){
      dispatch(createNotification(error.response.data.error, 'red', 5))
    }
  }

  const handleDelete = async (blog) => {
    try {
      const confirmDeletion = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

      if (confirmDeletion) {
        await blogService.remove(blog.id)
        //Remove deleted blog from blog list
        dispatch(setBlogs(blogs.filter(b => b.id !== blog.id)))
      }
    } catch (error) {
      dispatch(createNotification(error.response.data.error, 'red', 5))
    }
  }

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
              <NewBlogForm createNewBlog={handleNewBlog} />
            </Toggable>
          </div>
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App
