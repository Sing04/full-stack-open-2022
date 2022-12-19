import { useState } from "react"

const Blog = ({blog}) => {

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
  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
        <p>{blog.url}</p>
        likes {blog.likes} <button>Like</button>
        <p>{blog.author}</p>
      </div>
    </div>  
  )
}

export default Blog