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
export default notificationSlice.reducer