import { useState } from 'react'
import BlogButton from './BlogButton'

const Blog = ({ blog, handleLike, handleDelete }) => {

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
    <div>
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