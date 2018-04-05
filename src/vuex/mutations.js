/**
 * Mutations of Vuex
 */

// 声明 mutations事件以使用actions提交
const mutations = {
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
}

export default mutations
