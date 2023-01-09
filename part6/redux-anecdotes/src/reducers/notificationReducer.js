import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  show: false
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      const message = action.payload
      return {message: message, show: true}
    },
    removeNotification() {
      return {message: '', show: false}
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}
export default notificationSlice.reducer