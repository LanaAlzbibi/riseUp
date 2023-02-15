import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/Hello'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: hello
    }
  ]
})
export default router
