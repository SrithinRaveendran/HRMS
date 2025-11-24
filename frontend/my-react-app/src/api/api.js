import axios from 'axios'


const API_URL = import.meta.env.VITE_API_URL ||  'https://hrms-jptr.onrender.com'


const api = axios.create({ baseURL: API_URL, timeout: 15000 })


api.interceptors.request.use((config) => {
const token = localStorage.getItem('hrms_token')
if (token) config.headers.Authorization = `Bearer ${token}`
return config
})


export default api