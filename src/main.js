import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from '@/router/index'
import store from '@/vuex/store'
import './assets/iconfont/iconfont.css'

Vue.use(VueRouter)
Vue.use(Vuex)

FastClick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
