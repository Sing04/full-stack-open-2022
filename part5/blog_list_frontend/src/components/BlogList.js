import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Toggable from './Toggable'
import NewBlogForm from './NewBlogForm'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const sortedBlogs = [...blogs].sort((b1, b2) => b2.likes - b1.likes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const header = {
    marginTop: 30,
    marginBottom: 15
  }

  const divStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    marginTop: 5,
    border: '2px solid black'
  }

  return (
    <div>
      <div>
        <h2 style={header}>Blogs</h2>
      </div>
      <div>
        <Toggable buttonLabel='New Blog'>
          <NewBlogForm />
        </Toggable>
      </div>
      <div>
        {sortedBlogs.map(blog =>
          <div key={blog.id} style={divStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList