/**
 * State of Vuex
 */

// 声明state状态
const state = {

  vux:{
    //是否显示加载中
    isLoading:false
  },

  //用户信息
  userInfo:{
    openid:"",
    nickname:"",
    sex:"",
    province:"",
    city:"",
    country:"",
    headimgurl:"../../assets/vux_logo.png",
  },

  //微信获取的地理位置
  addressGps:""
}

export default state
