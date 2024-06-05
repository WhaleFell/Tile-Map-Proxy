import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosError
} from "axios"
import { notify } from "./notify"

const request: AxiosInstance = axios.create({
  // baseURL: "https://some-domain.com/api/",
  timeout: 1000
  // headers: { "X-Custom-Header": "foobar" }
})

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error: AxiosError) {
    // Do something with request error
    notify({
      type: "error",
      message: `Request error: ${error.config?.url}`
    })
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    notify({
      type: "error",
      message: `Request error: ${error.config?.url}`
    })
    return Promise.reject(error)
  }
)

export default request
