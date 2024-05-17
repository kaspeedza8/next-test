import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import todoSlice from './features/todos/todoSlice'

const persistConfig = {
 key: 'root',
 storage,
}

const todoReducer = persistReducer(persistConfig, todoSlice)

export const makeStore = configureStore({
 reducer: {
  todoReducer,
 },
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
   serializableCheck: false,
  }),
})

export const persistor = persistStore(makeStore)
// Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof makeStore.getState>
// export type AppDispatch = AppStore['dispatch']
