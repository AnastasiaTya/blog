import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './slice/ArticlesSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
