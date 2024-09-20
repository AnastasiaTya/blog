import axios from 'axios'

const configAxios = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
})

const getArticles = async (query: string, params?: Record<string, unknown>) => {
  const response = await configAxios.get(query, params)
  return response
}

export default getArticles
