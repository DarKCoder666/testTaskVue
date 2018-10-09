import Vue from 'vue'
import Router from 'vue-router'

import Mainpage from '@/components/Mainpage'
import Companies from '@/components/Companies'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Logout from '@/components/Logout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Mainpage',
      component: Mainpage
    },
    {
      path: '/companies',
      name: '',
      component: Companies
    },
    {
      path: '/signin',
      name: '',
      component: Signin
    },
    {
      path: '/signup',
      name: '',
      component: Signup
    },
    {
      path: '/logout',
      name: '',
      component: Logout
    }
  ]
})
