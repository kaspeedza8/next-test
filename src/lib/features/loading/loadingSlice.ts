import { RootState } from '@/lib/store'
import { createSlice, current } from '@reduxjs/toolkit'

type StateProp = {
 isLoading: boolean
}

const initialValue: StateProp = {
 isLoading: false,
}

const loadingSlice = createSlice({
 name: 'loading',
 initialState: initialValue,
 reducers: {
  setLoading: (state, action) => {
   state.isLoading = action.payload
   return
  },
 },
})

export const { setLoading } = loadingSlice.actions
export const todoSelector = (state: RootState) => state.todoReducer
export default loadingSlice.reducer
