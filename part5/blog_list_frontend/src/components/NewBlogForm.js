import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const NewBlogForm = () => {
  const dispatch = useDispatch()
  const { reset: resetTitle, ...title } = useField('text', 'title')
  const { reset: resetAuthor, ...author } = useField('text', 'author')
  const { reset: resetUrl, ...url } = useField('text', 'url')

  const newBlogFormStyle = {
    marginBottom: 15
  }

  const buttonStyle = {
    marginTop: 10
  }

  const handleNewBlog =  (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(createBlog(newBlog))
    dispatch(createNotification(`A new blog ${newBlog.title} by ${newBlog.author} added!`, 'green', 5))

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return(
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleNewBlog} style={newBlogFormStyle}>
        <div>
          title:
          <input {...title} id='blog-title' placeholder='Enter blog title' />
        </div>
        <div>
          author:
          <input {...author} id='blog-author' placeholder='Enter blog author' />
        </div>
        <div>
          url:
          <input {...url} id='blog-url' placeholder='Enter blog url' />
        </div>
        <div>
          <button id='create-blog' style={buttonStyle} type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}
export default NewBlogForm