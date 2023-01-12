import { useState } from 'react'
import BlogButton from './BlogButton'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(updatedBlog))
  }

  const handleDelete = (blog) => {
    const confirmDeletion = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (confirmDeletion) {
      dispatch(deleteBlog(blog))
    }

  }

  const [visible, setVisible] = useState('false')
  const showWhenVisible = {
    display: visible ? 'none' : '' ,
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = {
    display: visible ? '' : 'none',
    marginTop: 10,
    marginBottom: 10
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible} className='leanBlog'>
        {blog.title} {blog.author} <BlogButton handleClick={toggleVisibility} className='viewBlogDetails' buttonText='View' />
      </div>
      <div style={showWhenVisible} className='completeBlog'>
        <p>{blog.title} {blog.author} <BlogButton handleClick={toggleVisibility} className='hideButton' buttonText='Hide' /></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <BlogButton handleClick={() => handleLike(blog)} className='likeButton' buttonText='Like' /></p>
        <p>{blog.author}</p>
        <BlogButton handleClick={() => handleDelete(blog)} className='removeButton' buttonText='Remove' />
      </div>
    </div>
  )
}

export default Blog