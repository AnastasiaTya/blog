import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

import { configAxios } from '../../../services'

export type Idata = {
  email: string
  password: string
  username?: string
  image?: string
}

export const loginUser = createAsyncThunk('user/loginUser', async (data: Idata, { rejectWithValue }) => {
  try {
    const res = await configAxios.post('users/login', {
      user: {
        email: data.email,
        password: data.password,
      },
    })
    const { token } = res.data.user
    localStorage.setItem('token', token)
    return res.data.user
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (data: Idata, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  try {
    const res = await configAxios.put(
      'user',
      {
        user: {
          email: data.email,
          password: data.password,
          username: data.username,
          image: data.image,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    return res.data.user
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  try {
    const res = await configAxios.get('user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return res.data.user
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

interface UserState {
  user: {
    email: string
    username: string
    password: string
    token?: string
    image: string | null
  }
  error: string
  success: boolean
  isAuth: boolean
  updateSuccess: boolean | null
}

const initialState: UserState = {
  user: {
    email: '',
    username: '',
    password: '',
    token: '',
    image: null,
  },
  error: '',
  success: false,
  isAuth: false,
  updateSuccess: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.error = ''
    },
    clearSuccess(state) {
      state.success = false
    },
    changeAuth(state, action) {
      state.isAuth = action.payload
    },
    clearUpdateSuccess(state) {
      state.updateSuccess = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.success = true
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.updateSuccess = true
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.payload as string
      state.updateSuccess = false
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
    })
  },
})

export const { clearError, clearSuccess, changeAuth, clearUpdateSuccess } = userSlice.actions

export default userSlice.reducer
