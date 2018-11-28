// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/index.css'
import App from './App'
import router from './router'
import moment from 'moment'
import MyAjax from './components/plugins/http.js'

import BreadCrumb from './components/common/breadCrumb.vue'

Vue.use(ElementUI)
Vue.use(MyAjax)
Vue.filter('fmtDate', (value, fmtStr) => {
  return moment(value).format(fmtStr)
})
Vue.component(BreadCrumb.name, BreadCrumb)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
