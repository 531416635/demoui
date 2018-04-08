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

  //预约页面详情信息的展示
  setRegister(state, stateOfChange){
    state.register.type = stateOfChange.type
    state.register.title = stateOfChange.title
    state.register.describe = stateOfChange.describe
    state.register.question = stateOfChange.question
    state.register.address = stateOfChange.address
    state.register.phone = stateOfChange.phone
  }

}

export default mutations
