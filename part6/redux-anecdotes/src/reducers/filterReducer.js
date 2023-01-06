import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      const substring = action.payload
      return substring
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer