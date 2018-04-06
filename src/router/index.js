import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/view/index'
import register from '@/components/view/register'

Vue.use(Router)

var routeData = [
  {
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/register',
    name: 'register',
    component: register
  },
]


var router = new Router({
  routes: routeData
})


export default router;
