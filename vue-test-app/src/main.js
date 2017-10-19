// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'//用来解决的兼容性(主要是华为手机自带浏览器)

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueTouch from 'vue-touch'
import loading from './components/loading'
import valert from './components/valert'

Vue.config.productionTip = false

Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(loading)
Vue.use(valert)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
