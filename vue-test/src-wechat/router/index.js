import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/regist', name: 'regist', component: require('../views/home/regist.vue') },
    { path: '/contract/list', name: 'mycontract', component: require('../views/contract/list.vue') },
    {
      path: '*', redirect: './regist'
    }
  ]
})
