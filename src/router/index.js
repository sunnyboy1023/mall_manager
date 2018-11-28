import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import User from '../components/user/user.vue'
import Roles from '../components/rights/roles.vue'
import Rights from '../components/rights/rights.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    children: [{
      name: 'user',
      path: '/user',
      component: User
    },
    {
      name: 'roles',
      path: '/roles',
      component: Roles
    },
    {
      name: 'rights',
      path: '/rights',
      component: Rights
    }]
  },
  {
    path: '/',
    component: Login
  }
  ]
})
