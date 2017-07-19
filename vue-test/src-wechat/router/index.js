import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/regist', name: 'regist', component: require('../views/home/regist.vue') },
    { path: '/contract/list', name: 'mycontract', component: require('../views/contract/list.vue') },
    { path: '/contract/detail', name: 'detail', component: require('../views/contract/detail.vue') },
    { path: '/contract/detail/:type/:contractid', name: 'detail', component: require('../views/contract/detail.vue') },
    {
      path: '*', redirect: './regist'
    }
  ]
})
