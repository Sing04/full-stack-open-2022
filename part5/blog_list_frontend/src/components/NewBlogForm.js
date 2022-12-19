import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({blogs, setBlogs, setNotificationMessage}) => {

  const newBlogFormStyle = {
    marginBottom: 15
  }
  
  const buttonStyle = {
    marginTop: 10
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleNewBlog = async (event) => {    
    event.preventDefault()

    try {
      const newBlogObject = {
        title: title,
        author: author,
        url: url
      }
      const blog = await blogService.create(newBlogObject)

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(blog))

      setNotificationMessage({
        message: `A new blog ${blog.title} by ${blog.author} added!`,
        color: 'green'
      })
      setTimeout(() => {
        setNotificationMessage({
          message: null,
          color: 'white'})
      }, 5000)

    } catch (error) {
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

  return(
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleNewBlog} style={newBlogFormStyle}>
        <div>
          title: 
          <input type="text" value={title} name="Username" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: 
          <input type="text" value={author} name="Username" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: 
          <input type="text" value={url} name="Username" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button style={buttonStyle} type="submit">Create</button>
        </div> 
      </form> 
    </div>
  )
}
export default NewBlogForm