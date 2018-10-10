// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Importing Element UI and its main css file
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Importing store which is created by Vuex
import store from './store'

import VueLodash from 'vue-lodash'

Vue.use(VueLodash);

Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
