import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  show: false,
  timeoutId: undefined
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      const message = action.payload
      return {...state, message: message, show: true}
    },
    removeNotification(state) {
      return {...state, message: '', show: false}
    },
    setTimeoutId(state, action) {
      return {...state, timeoutId: action.payload}
    },
  }
})

export const { createNotification, removeNotification, setTimeoutId, getTimeoutId } = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(createNotification(message))
    dispatch(getTimeoutId())
    const newId = setTimeout(() => {
      dispatch(removeNotification())
      }, time * 1000)
    dispatch(setTimeoutId(newId))
  }
}
export default notificationSlice.reducer