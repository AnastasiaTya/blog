import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getArticles from '../../../services'
import { ArticleType } from '../../../types/articlesType'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset: number, { rejectWithValue }) => {
  try {
    const res = await getArticles('articles', { params: { offset } })
    return res.data.articles
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug: string, { rejectWithValue }) => {
  try {
    const res = await getArticles(`articles/${slug}`)
    return res.data.article
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

interface ArticlesState {
  articles: ArticleType[]
  article: ArticleType | null
  error: string | null
  isLoading: boolean
  page: number
}

const initialState: ArticlesState = {
  articles: [],
  article: null,
  error: '',
  isLoading: true,
  page: 1,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    onLoading(state) {
      state.isLoading = true
    },
    removeArticle(state) {
      state.article = null
    },
    pageChange(state, action) {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.error = action.payload as string
      state.isLoading = false
    })
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload
      state.isLoading = false
    })
  },
})

export const { onLoading, removeArticle, pageChange } = articlesSlice.actions

export default articlesSlice.reducer
