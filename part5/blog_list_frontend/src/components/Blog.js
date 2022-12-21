import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setNotificationMessage, blogs, setBlogs }) => {

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

      //Update blog list with new like
      setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))

    } catch(error){
      setNotificationMessage({
        message: error.response.data.error,
        color: 'red'
      })
      setTimeout(() => {
        setNotificationMessage({
          message: null,
          color: 'white' })
      }, 5000)
    }
  }

  const handleDelete = async () => {
    try {
      const confirmDeletion = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

      if (confirmDeletion) {
        await blogService.remove(blog.id)
        //Remove deleted blog from blog list
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    } catch (error) {
      setNotificationMessage({
        message: error.response.data.error,
        color: 'red'
      })
      setTimeout(() => {
        setNotificationMessage({
          message: null,
          color: 'white' })
      }, 5000)
    }
  }

  return (
    <div>
      <div style={hideWhenVisible} className='leanBlog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className='completeBlog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
        <p>{blog.url}</p>
        likes {blog.likes} <button onClick={handleLike}>Like</button>
        <p>{blog.author}</p>
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  )
}

export default Blog