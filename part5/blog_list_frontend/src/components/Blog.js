import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog, setNotificationMessage, blogs, setBlogs}) => {

  const [visible, setVisible] = useState('false')
  const showWhenVisible = { 
    display: visible ? 'none' : '' ,
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    try {
      const updatedBlog = {
        user: blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      
      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))

    } catch(error){
      setNotificationMessage({
        message: error.response.data.error,
        color: 'red'
      })
      setTimeout(() => {
        setNotificationMessage({
          message: null,
          color: 'white'})
      }, 5000)
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
        <p>{blog.url}</p>
        likes {blog.likes} <button onClick={handleLike}>Like</button>
        <p>{blog.author}</p>
      </div>
    </div>  
  )
}

export default Blog