import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { ArticleState } from '../../../types/articlesType'
import { configAxios } from '../../../services'

type Idata = {
  title: string
  body: string
  description: string
  tagList: string[]
}

interface Iresponse {
  data: Idata
  slug: string
}

export const createArticle = createAsyncThunk('article/createArticle', async (data: Idata, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  try {
    const res = await configAxios.post(
      'articles',
      {
        article: {
          title: data.title,
          body: data.body,
          description: data.description,
          tagList: data.tagList,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    return res.data.article
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const deleteArticle = createAsyncThunk('article/deleteArticle', async (slug: string, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  try {
    const res = await configAxios.delete(`articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return res.data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const updateArticle = createAsyncThunk<Iresponse, { data: Idata; slug: string }>(
  'article/updateArticle',
  async ({ data, slug }, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
      const res = await configAxios.put(
        `articles/${slug}`,
        {
          article: {
            title: data.title,
            body: data.body,
            description: data.description,
            tagList: data.tagList,
          },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      return res.data.article
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState: ArticleState | null = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
}

const acticleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createArticle.fulfilled, (state) => {
      state.article = null
    })
    builder.addCase(updateArticle.fulfilled, (state) => {
      state.article = null
    })
  },
})

export default acticleSlice.reducer
