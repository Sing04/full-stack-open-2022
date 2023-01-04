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
          <input id='blog-title' type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} placeholder='Enter blog title'/>
        </div>
        <div>
          author:
          <input id='blog-author' type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} placeholder='Enter blog author'/>
        </div>
        <div>
          url:
          <input id='blog-url' type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} placeholder='Enter blog URL'/>
        </div>
        <div>
          <button id='create-blog' style={buttonStyle} type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}
export default NewBlogForm