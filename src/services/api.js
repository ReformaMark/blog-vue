import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: 'application/json'
  }
})


api.interceptors.request.use(config => {
  const token = localStorage.getItem('user-token')
  if (token) {
    const cleanToken = token.replace(/^"|"$/g, '') // remove  the ""
    config.headers.Authorization = `Bearer ${cleanToken}`
  }
  return config
})


export default api
