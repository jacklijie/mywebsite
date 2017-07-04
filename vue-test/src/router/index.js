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
    { path: '/opentype', name: 'opentype', component: require('../views/home/opentype.vue') },
    {
      path: '*', redirect: './home'
    }
  ]
})
