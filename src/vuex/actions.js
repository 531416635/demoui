// import axios from '@/api/axios'
import axios from 'axios'
import {router} from '../router/index'
/**
 * 解决跨域请求时，session丢失的问题（需与后台跨域请求一起设置Credentials）
 * @type {boolean}
 */
axios.defaults.withCredentials=true;

const hostUrl = "http://47.94.99.53/demo0307/"
//图片大小限制 5M的大小为 5*1024*1024 即 1048576*5
var imgSize = 5242880;

// 声明 actions事件
const actions = {

  // todo 首页获取后台返回的用户信息
  getUserInfo({ commit,state},val){
      axios({
      method: 'post',
      url: hostUrl + 'wechat/getUserInfo.do',
    }).then((response) => {
        let code = response.data.code
        let msgCode = response.data.msgCode
        let result = response.data.result
        if(code == 1 && msgCode == 1){
          commit('setUserInfo',result)
        }else{
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxec4ae298ee5742d7&redirect_uri=http%3a%2f%2f47.94.99.53%2fdemo0307%2fwechat%2fgetAuth.do&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          window.location.href = url
        }
    }).catch((err) =>{
    })
  },

}

export default actions
