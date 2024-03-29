import BlogButton from './BlogButton'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog, commentBlog } from '../reducers/blogReducer'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useField } from '../hooks'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const { reset: resetComment, ...comment } = useField('text', 'comment')
  const user = useSelector(state => state.loginUser)

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

  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment.value))
    resetComment()
  }

  if (!blog) {
    return null
  }

  const padding = {
    marginTop: 30,
    marginBottom: 15
  }

  const text = {
    margin: 0,
    padding: 0
  }

  return (
    <div>
      <h2 style={padding}>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p style={text}>likes {blog.likes} <BlogButton handleClick={() => handleLike(blog)} className='likeButton' buttonText='Like' /></p>
      <p style={text}>added by {blog.user.name}</p>
      {user.username === blog.user.username &&
        <div style={padding}>
          <BlogButton handleClick={() => handleDelete(blog)} className='removeButton' buttonText='Delete Blog' />
        </div>
      }
      <h4 style={padding}>Comments</h4>
      <div className='form-inline'>
        <Form onSubmit={addComment}>
          <InputGroup className='mb-3'>
            <Form.Control {...comment} placeholder='Write your comment here' />
            <Button variant='outline-primary' type='submit'>
              Add comment
            </Button>
          </InputGroup>
        </Form>
      </div>
      <ul>
        {blog.comments !== null
          ? blog.comments.map(comment =>
            <li key={comment}>{comment}</li>)
          : null}
      </ul>
    </div>
  )
}

export default Blog