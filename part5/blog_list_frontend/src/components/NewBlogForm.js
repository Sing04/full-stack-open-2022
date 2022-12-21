import { useState } from 'react'

const NewBlogForm = ({ createNewBlog }) => {

  const newBlogFormStyle = {
    marginBottom: 15
  }

  const buttonStyle = {
    marginTop: 10
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog =  (event) => {
    event.preventDefault()

    const newBlogObject = {
      title: title,
      author: author,
      url: url
    }

    createNewBlog(newBlogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleNewBlog} style={newBlogFormStyle}>
        <div>
          title:
          <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} placeholder='Enter blog title'/>
        </div>
        <div>
          author:
          <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} placeholder='Enter blog author'/>
        </div>
        <div>
          url:
          <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} placeholder='Enter blog URL'/>
        </div>
        <div>
          <button style={buttonStyle} type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}
export default NewBlogForm