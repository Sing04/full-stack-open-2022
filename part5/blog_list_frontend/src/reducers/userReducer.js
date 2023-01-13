import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    addUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    }
  }
})

export const { addUser, removeUser } = userSlice.actions

export const setUser = (user) => {
  return dispatch => {
    blogService.setToken(user.token)
    dispatch(addUser(user))
  }
}

export default userSlice.reducer