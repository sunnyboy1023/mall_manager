// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'

Vue.use(ElementUI)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.filter('fmtDate', (value, fmtStr) => {
  return moment(value).format(fmtStr)
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
