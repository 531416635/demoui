import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from '@/router/index'
import store from '@/vuex/store'
import './assets/iconfont/iconfont.css'
import { WechatPlugin } from 'vux'
import axios from 'axios'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(WechatPlugin)


FastClick.attach(document.body)
Vue.config.productionTip = false


Vue.prototype.SDKRegister = (that, callback) => {
  // 接入微信JSSDK
  // 获取微信JSSDK配置
  let url = that.$route.path
  console.log(url)
  axios({
    method: 'post',
    url: 'http://47.94.99.53/demo0307/wechat/getJsSdkConfig.do',
    data : {
      url: url
    },
  }).then((response) => {
    let res = response.data
    that.$wechat.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名，见附录1
      jsApiList: res.jsApiList

    })
  }).catch((err) =>{
  })
  that.$wechat.ready((res) => {

    // 如果需要定制ready回调方法
    if(callback){
      callback.call(that)
    }
  })
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
