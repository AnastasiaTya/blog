import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './slice/ArticlesSlice'
import userReducer from './slice/UserSlice'
import articleReducer from './slice/ArticleSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
    article: articleReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
