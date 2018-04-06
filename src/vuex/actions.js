import axios from 'axios'
import wx from 'weixin-js-sdk'

/**
 * 解决跨域请求时，session丢失的问题（需与后台跨域请求一起设置Credentials）
 * @type {boolean}
 */
axios.defaults.withCredentials = true;

const hostUrl = "http://www.myyunfu.com/demo0307/"
//图片大小限制 5M的大小为 5*1024*1024 即 1048576*5
var imgSize = 5242880;

// 声明 actions事件
const actions = {

  // todo 首页获取后台返回的用户信息
  getUserInfo({commit, state}, val) {
    axios({
      method: 'post',
      url: hostUrl + 'wechat/getUserInfo.do',
    }).then((response) => {
      let code = response.data.code
      let msgCode = response.data.msgCode
      let result = response.data.result
      if (code == 1 && msgCode == 1) {
        commit('setUserInfo', result)
      } else {
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxec4ae298ee5742d7&redirect_uri=http%3a%2f%2fwww.myyunfu.com%2fdemo0307%2fwechat%2fgetAuth.do&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        window.location.href = url
      }
    }).catch((err) => {
    })
  },

  //微信jssdk获取用户位置
  getLocationWx({commit, state}, val) {
    let url = val.url
    if ("" == url || null == url || undefined == url) {
      return false;
    }
    axios({
      method: 'post',
      url: hostUrl + 'wechat/getJsSdkConfig.do',
      data: {
        url: url
      },
    }).then((response) => {
      let res = response.data
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: ['getLocation']
      })
      wx.ready(() => {

        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。

            // 地址解析:http://lbs.qq.com/javascript_v2/guide-service.html#link-four
            //地址和经纬度之间进行转换服务
            let geocoder = new qq.maps.Geocoder();
            var latLng = new qq.maps.LatLng(latitude, longitude);
            //对指定经纬度进行解析
            geocoder.getAddress(latLng);
            //设置服务请求成功的回调函数
            geocoder.setComplete(function (result) {
              commit('setAddressGps', result.detail.address)
            });
            //若服务请求失败，则运行以下函数
            geocoder.setError(function () {
              alert("出错了，获取经纬度失败！");
            });
          }
        })

      })

      this.$wechat.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log("error=========")
        console.log(res)
      });
    }).catch((err) => {
    })
  }

}

export default actions
