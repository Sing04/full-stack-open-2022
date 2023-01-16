import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Form, Button, InputGroup } from 'react-bootstrap'


const NewBlogForm = () => {
  const dispatch = useDispatch()
  const { reset: resetTitle, ...title } = useField('text', 'title')
  const { reset: resetAuthor, ...author } = useField('text', 'author')
  const { reset: resetUrl, ...url } = useField('text', 'url')

  const newBlogFormStyle = {
    marginBottom: 15
  }

  const buttonStyle = {
    marginTop: 0
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
      <h4 style={{ marginTop: 30 }}>Create New Blog</h4>
      <Form onSubmit={handleNewBlog} style={newBlogFormStyle}>
        <InputGroup className='mb-3'>
          <InputGroup.Text>Title:</InputGroup.Text>
          <Form.Control {...title} id='blog-title' placeholder='Enter blog title' />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>Author:</InputGroup.Text>
          <Form.Control {...author} id='blog-author' placeholder='Enter blog author' />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>URL:</InputGroup.Text>
          <Form.Control {...url} id='blog-url' placeholder='Enter blog url' />
        </InputGroup>
        <Button variant='outline-primary' id='create-blog' style={buttonStyle} type="submit">Create</Button>
      </Form>
    </div>
  )
}
export default NewBlogForm