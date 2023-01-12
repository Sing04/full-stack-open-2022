import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Blog from './Blog'
import { initializeBlogs } from '../reducers/blogReducer'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((b1, b2) => b2.likes - b1.likes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList