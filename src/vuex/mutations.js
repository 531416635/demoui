/**
 * Mutations of Vuex
 */

// 声明 mutations事件以使用actions提交
const mutations = {

  //loading状态显示控制
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  },
  //  渲染首页数据 用户信息和前三条历史记录
  setUserInfo(state, stateOfChange){
      state.userInfo.openid = stateOfChange.openid
      state.userInfo.nickname = stateOfChange.nickname
      state.userInfo.sex = stateOfChange.sex
      state.userInfo.province = stateOfChange.province
      state.userInfo.city = stateOfChange.city
      state.userInfo.country = stateOfChange.country
      state.userInfo.headimgurl = stateOfChange.headimgurl
  },
  //设置GPS获取的地理位置
  setAddressGps(state, stateOfChange){
    //国家
    let country = stateOfChange.country
    //省
    let province = stateOfChange.province
    //市
    let city = stateOfChange.city
    //县 镇
    let district = stateOfChange.district
    //街道
    let street = stateOfChange.street
        state.addressGps.detail = province + city + district + street
        if("" == province || null ==province){
          province = "--"
        }
        if("" == city || null ==city){
          city = "--"
        }
        if("" == district || null ==district){
          district = "--"
        }
        state.addressGps.provinceCityDistrict = []
        state.addressGps.provinceCityDistrict.push(province)
        state.addressGps.provinceCityDistrict.push(city)
        state.addressGps.provinceCityDistrict.push(district)
    },

  //预约页面信息填写
  setRegister(state, stateOfChange){
    state.register.type = stateOfChange.type
    state.register.title = stateOfChange.title
    state.register.describe = stateOfChange.describe
    state.register.question = stateOfChange.question
    state.register.address = stateOfChange.address
    state.register.phone = stateOfChange.phone
  },

  //维修记录页面入参信息
  setOrderPage(state, stateOfChange){
    let totalCount = stateOfChange.totalCount
    let currentPage = stateOfChange.currentPage
    let pageSize = stateOfChange.pageSize
    let isShowMore = stateOfChange.isShowMore
    //总条数
    state.orderPage.totalCount = totalCount
    //总条数为0 或者 总条数小于等于 当前页数与页面大小的 积 则无需加载更多
    if(0 == totalCount || totalCount <= pageSize * currentPage){
      state.orderPage.currentPage = currentPage
      state.orderPage.isShowMore = false
    }else {
      state.orderPage.currentPage = currentPage + 1
      state.orderPage.isShowMore = true
    }
    // 若指定了显示加载更多；则tab切换时 应该显示
    if(isShowMore){
      state.orderPage.isShowMore = true
    }
    state.orderPage.pageSize = pageSize
    //解决下拉刷新时订单状态不用改变
    if(null !=stateOfChange.orderStatus && undefined != stateOfChange.orderStatus){
      state.orderPage.orderStatus = stateOfChange.orderStatus
    }
  },

  //维修记录出参数据
  setOrderList(state, stateOfChange){
    //下拉刷新时 直接更换记录值
    if(1 == state.orderPage.currentPage){
      state.orderList = stateOfChange
    }else{
      //上拉加载数据时，拼接订单数据
      state.orderList.concat(stateOfChange)
    }
  },
  //清空维修记录数据
  clearOrderList(state, stateOfChange){
      state.orderList = []
  },
}

export default mutations
