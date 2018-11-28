import Axios from 'axios'
const MyAjax = {}
MyAjax.install = function (Vue) {
  // 添加实例方法
  Vue.prototype.$http = Axios
  Axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 添加请求拦截器
  Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
}
export default MyAjax
