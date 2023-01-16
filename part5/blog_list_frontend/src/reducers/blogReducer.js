import { createSlice } from '@reduxjs/toolkit'
import  blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const id = action.payload.id
      const changedBlog = action.payload
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { addBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    try {
      const blog = await blogService.create(newBlog)
      dispatch(addBlog(blog))
    } catch (error) {
      dispatch(createNotification(error.response.data.error, 'red', 5))
    }
  }
}

export const likeBlog = (likedBlog) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.update(likedBlog.id, likedBlog)
      dispatch(updateBlog(returnedBlog))
      dispatch(createNotification(`You liked: ${returnedBlog.title} by ${returnedBlog.author}!`, 'green', 5))
    } catch(error) {
      dispatch(createNotification(error.response.data.error, 'red', 5))
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    try {
      const comments = blog.comments
        ? blog.comments
        : []

      const updatedBlog = { ...blog, comments: comments.concat(comment) }

      const returnedBlog = await blogService.comment(updatedBlog.id, updatedBlog)
      dispatch(updateBlog(returnedBlog))
      dispatch(createNotification(`Your comment was added to ${returnedBlog.title} by ${returnedBlog.author}!`, 'green', 5))
    } catch(error) {
      dispatch(createNotification(error.response.data.error, 'red', 5))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(createNotification(`You successfully deleted the following blog: ${blog.title} by ${blog.author}!`, 'green', 5))
    } catch(error) {
      dispatch(createNotification(error.response.data.error, 'red', 5))
    }
  }
}

export default blogSlice.reducer