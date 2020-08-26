import axios from 'axios'
const http = axios.create({
  baseURL: '/api'
})
http.interceptors.request.use(req => {
  let authorization = ''
  authorization = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : ''
  req.headers.authorization = authorization
  return req
})

http.interceptors.response.use(res => {
  return res.data
})
export default http
