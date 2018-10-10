import Vue from 'vue'
import Router from 'vue-router'

import Mainpage from '@/components/Mainpage'
import Companies from '@/components/Companies'

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
    }
  ]
})
