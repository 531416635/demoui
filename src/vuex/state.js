/**
 * State of Vuex
 */

// 声明state状态
const state = {

  //是否显示加载中
  isLoading:false,

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
  addressGps:{
    detail:"",
    provinceCityDistrict:[]
  },

  //预约页面信息填写
  register:{
    type:"",
    title:"",
    describe:"",
    question:"",
    address:"",
    dateTime:"",
    phone:"",
  },

  //维修记录页面入参信息
  orderPage:{
    currentPage:1,
    pageSize:10,
    orderStatus:"0",
  },

  orderListData: [], // 下拉更新数据存放数组
  orderDownData: [], // 上拉更多的数据存放数组



}

export default state
