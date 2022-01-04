import axios from "axios"
import serverConfig from './serverConfig'

class useOnServer {
  $api = null
  status = null

  constructor() {
    console.log('new on server run')
    this.$api = axios.create({
      baseURL: serverConfig.baseUrl
    })

    this.$api.interceptors.request.use(
      config => {
        const accessToken = this.getToken()
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    //midleware for error response
    this.$api.interceptors.response.use(
      response => response,
      error => {
        const { response: { status } } = error
        if (status === 401) {
          localStorage.removeItem('userData')
        } else if (status === 403) {
          this.status = 403
        }
        return Promise.reject(error)
      }
    )
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('userData'))
    if(token) {
      return token['token']
    } else {
      return null
    }
  }
}

export default useOnServer