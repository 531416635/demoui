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
      <x-address title="省市区"  v-model="register.address" raw-value :list="addressData"></x-address>
    </group>
    <div>{{addressGps}}</div>
  </div>
</template>

<script>
  import {Masker,XTextarea,XInput,Group,GroupTitle,XAddress,ChinaAddressV4Data   } from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "register",
    components: {
      Masker,
      XTextarea,
      XInput,
      Group,
      GroupTitle,
      XAddress,
    },
    data() {
      return {
        maskerList: {
          title: '哈哈哈',
          img: ''
        },
        addressData: ChinaAddressV4Data,
        title: '默认为空',
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
</style>
