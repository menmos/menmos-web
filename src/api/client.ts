import axios, { AxiosError } from 'axios'

import history from '../utils/history'
import { getToken, logout } from '../components/utils/use-auth'

// TODO: Throw exception when environment variable is undefined
export const httpClient = axios.create({
  baseURL: process.env['PUBLIC_URL']
})

httpClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  async (error) => {
    await Promise.reject(error)
  }
)

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 400) {
      logout()
      history.push('/')
    }
  }
)
