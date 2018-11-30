import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'

import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Roles from '../components/rights/roles.vue'
import Rights from '../components/rights/rights.vue'

Vue.use(Router)
const router = new Router({
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
      name: 'users',
      path: '/users',
      component: Users
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
    }
    ]
  },
  {
    path: '/',
    component: Login
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      Message.warning('请先登录')
      return
    }
    next()
  }
})

export default router
