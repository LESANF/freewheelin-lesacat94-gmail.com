import axios from 'axios'

const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://assignment.mathflat.com'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error(`[API Error] ${error.response?.status} ${error.config?.url}`)
    return Promise.reject(error)
  }
)
