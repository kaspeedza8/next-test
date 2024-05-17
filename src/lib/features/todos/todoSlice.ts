import { RootState } from '@/lib/store'
import { createSlice, current } from '@reduxjs/toolkit'

type stateMainProps = {
 title: string
}

type StateProp = {
 data: stateMainProps[]
}

const initialValue: StateProp = {
 data: [],
}

const todoSlice = createSlice({
 name: 'todo',
 initialState: initialValue,
 reducers: {
  addTitle: (state, action) => {
   state.data.push({
    title: action.payload,
   })
   return
  },
  removeByIndex: (state, action) => {
   state.data.splice(action.payload, 1)
   return
  },
  resetTitle: (state) => {
   state = initialValue
   return
  },
 },
})

export const { addTitle, removeByIndex, resetTitle } = todoSlice.actions
export const todoSelector = (state: RootState) => state.todoReducer
export default todoSlice.reducer
