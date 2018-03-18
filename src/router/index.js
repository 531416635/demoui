import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index'

Vue.use(Router)

var routeData =[
  {
  path: '/',
  name: 'index',
  component: index
  }
]



var router = new Router({
  routes: routeData
})


export default router;