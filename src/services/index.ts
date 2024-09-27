import axios from 'axios'

export const configAxios = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
})

const getArticles = async (query: string, params?: Record<string, unknown>) => {
  const token = localStorage.getItem('token')
  const response = await configAxios.get(query, {
    ...params,
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return response
}

export type Idata = {
  username: string
  email: string
  password: string
}

export const createUser = async (data: Idata) => {
  try {
    const res = await configAxios.post('users', {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    })
    return res
  } catch (err) {
    return Promise.reject(err)
  }
}

export default getArticles
