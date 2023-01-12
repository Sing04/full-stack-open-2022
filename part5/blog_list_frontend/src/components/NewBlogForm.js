import { useField } from '../hooks'

const NewBlogForm = ({ createNewBlog }) => {
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

    const newBlogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    createNewBlog(newBlogObject)

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
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <div>
          <button id='create-blog' style={buttonStyle} type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}
export default NewBlogForm