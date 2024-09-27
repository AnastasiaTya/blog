import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getArticles, { configAxios } from '../../../services'
import { ArticleType } from '../../../types/articlesType'

interface ArticlesState {
  articles: ArticleType[]
  article: ArticleType | null
  error: string | null
  isLoading: boolean
  page: number
  isLiked?: boolean
}

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

export const favoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async ({ slug, favorited }: { slug: string; favorited: boolean }, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
      const res = favorited
        ? await configAxios.delete(`articles/${slug}/favorite`, { headers: { Authorization: `Token ${token}` } })
        : await configAxios.post(`articles/${slug}/favorite`, {}, { headers: { Authorization: `Token ${token}` } })
      return res.data.article
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState: ArticlesState = {
  articles: [],
  article: null,
  error: '',
  isLoading: true,
  page: 1,
  isLiked: false,
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
    builder.addCase(favoriteArticle.fulfilled, (state, action) => {
      const updatedArticle = action.payload
      if (state.article?.slug === updatedArticle.slug) {
        state.article.favorited = updatedArticle.favorited
        state.article.favoritesCount = updatedArticle.favoritesCount
      }
      const articleIndex = state.articles.findIndex((a) => a.slug === updatedArticle.slug)
      if (articleIndex !== -1) {
        state.articles[articleIndex].favorited = updatedArticle.favorited
        state.articles[articleIndex].favoritesCount = updatedArticle.favoritesCount
      }
    })
  },
})

export const { onLoading, removeArticle, pageChange } = articlesSlice.actions

export default articlesSlice.reducer
