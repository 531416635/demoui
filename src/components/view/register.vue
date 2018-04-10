<template>
  <div>
    <div style="overflow: hidden;">
      <masker style="border-radius: 2px;" :opacity="0.8" >
        <div class="m-img" :style="{backgroundImage:'url('+maskerList.img+')'}"></div>
        <div slot="content" class="m-title">
          {{maskerList.title}}
          <br/>
        </div>
      </masker>
    </div>

    <group>
      <group-title slot="title">{{register.title}}</group-title>
      <group-title slot="title">{{register.describe}}</group-title>
      <x-textarea :max="200" name="description" placeholder="请输入问题详情"  v-model="register.question"></x-textarea>
    </group>
    <group>
      <group-title slot="title">联系方式：</group-title>
      <x-input placeholder="请输入手机号码" mask="999 9999 9999" v-model="register.phone" :max="13" is-type="china-mobile"></x-input>
    </group>
    <group>
      <x-address title="省市区"  v-model="addressGps.provinceCityDistrict" raw-value :list="addressData"></x-address>
    </group>
    <group>
      <group-title slot="title">详细地址：</group-title>
      <x-textarea placeholder="请输入详细的街道信息"  v-model="register.address" :max="100" :rows="2" autosize></x-textarea>
    </group>
    <div class="jianxi"></div>
    <div style="margin: 10px">
      <x-button  :disabled="disable001" @click.native="submitRegister" :show-loading="showLoad" type="primary">提交预约</x-button>
    </div>
    <div class="jianxi"></div>
  </div>
</template>

<script>
  import {Masker,XTextarea,XInput,Group,GroupTitle,XAddress,ChinaAddressV4Data,XButton,Value2nameFilter as value2name   } from 'vux'
  import { mapState, mapActions } from 'vuex'
  import axios from 'axios'

  export default {
    name: "register",
    components: {
      Masker,
      XTextarea,
      XInput,
      Group,
      GroupTitle,
      XAddress,
      XButton
    },
    data() {
      return {
        maskerList: {
          title: '哈哈哈',
          img: ''
        },
        addressData: ChinaAddressV4Data,
        title: '默认为空',
        showLoad:false,
        disable001:false
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
        register: state => state.register,
        addressGps: state => state.addressGps
      }),
    },
    methods:{
      //提交预约纪录
      submitRegister:function(){
        this.disable001 = true
        this.showLoad = true
        let addressValue = value2name(this.$store.state.addressGps.provinceCityDistrict, ChinaAddressV4Data)
        axios({
          method: 'post',
          url: 'http://www.myyunfu.com/demo0307/wechat/createRegister.do',
          data : {
            register : this.$store.state.register,
            addressGps : this.$store.state.addressGps,
            addressValue : addressValue
          }
        }).then((response) => {
//                        todo 这是个坑，response返回的code一定要用变量来存储 不然if内无法执行
          let code = response.data.code
          if(code == 1 ){
            this.disable001 = false
            this.showLoad = false
          }
        }).catch((err) =>{
//          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .m-img {
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
  .red {
    color: red;
  }
  .green {
    color: green;
  }
  .jianxi{
    padding-top: 0.5rem;
  }
</style>
