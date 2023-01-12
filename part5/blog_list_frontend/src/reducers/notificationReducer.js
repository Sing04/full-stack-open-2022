import { createSlice } from '@reduxjs/toolkit'

const initialState ={
  message: null,
  color: 'white'
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action){
      return { message: action.payload.message, color: action.payload.color }
    }
  }
})

export const { setNotification } = notificationSlice.actions

let timeoutId = null

export const createNotification = (message, color, time) => {
  return dispatch => {
    dispatch(setNotification({ message, color }))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(setNotification({ message: null, color: 'white' }))
    }, time * 1000)
  }
}

export default notificationSlice.reducer