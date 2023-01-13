import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Blog from './Blog'
import Toggable from './Toggable'
import NewBlogForm from './NewBlogForm'
import { initializeBlogs } from '../reducers/blogReducer'

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
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default BlogList