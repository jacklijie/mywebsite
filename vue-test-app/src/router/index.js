import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    { path: '/', name: 'home', component: require('../views/home/home.vue') },
    { path: '/regist', name: 'regist', component: require('../views/home/regist.vue') },
    { path: '/confirm', name: 'confirm', component: require('../views/info/confirm.vue') },
    { path: '/opentype', name: 'opentype', component: require('../views/home/opentype.vue') },
    { path: '/contract/list', name: 'mycontract', component: require('../views/contract/list.vue') },
    { path: '/contract/detail/:type/:contractid', name: 'detail', component: require('../views/contract/detail.vue') },
    { path: '/contract/sign', name: 'sign', component: require('../views/contract/sign.vue') },
    {
      path: '*', redirect: './home'
    }
  ]
})
