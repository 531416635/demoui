<template>
<div>

  <card><div slot="content"  style="height: 3rem;background-color: aqua;"></div></card>
  <div class="float_div">
    <div class="float_div_1">
      <!--<img src="">-->
      <img :src="userInfo.headimgurl">
      <div class="float_div_2">
        <span class="float_div_2_span">{{userInfo.nickname}}</span>
        <i class="iconfont  icon-dizhi"></i>
        <span class="float_div_2_span1">{{addressGps.detail}}</span>
      </div>
      <i class="iconfont icon-icon6"></i>
    </div>
  </div>
  <grid style="padding-top: 1rem;margin-left: 4%;">
    <grid-item class="grid_1" @on-item-click="goToRegister('1')">
      <i class="iconfont  icon-bingxiang" slot="icon"></i>
      <span slot="label" class="grid-center">冰箱维修</span>
    </grid-item>
  </grid>
  <grid style="padding-top: 1rem;float: right;margin-right: 4%;">
    <grid-item class="grid_2" @on-item-click="goToRegister('2')">
      <i class="iconfont  icon-xiyiji" slot="icon"></i>
      <span slot="label" class="grid-center">洗衣机维修</span>
    </grid-item>
  </grid>
  <grid style="margin-left: 4%;" >
    <grid-item class="grid_3"@on-item-click="goToRegister('3')">
      <i slot="icon" class="iconfont  icon-password"></i>
      <span slot="label" class="grid-center">换锁芯</span>
    </grid-item>
  </grid>
  <grid style="float: right;margin-right: 4%;" >
    <grid-item class="grid_4" @on-item-click="goToRegister('4')">
      <i class="iconfont  icon-dianshi" slot="icon"></i>
      <span slot="label" class="grid-center">电视维修</span>
    </grid-item>
  </grid>
  <grid style="margin-left: 4%;" >
    <grid-item class="grid_5" @on-item-click="goToRegister('5')">
      <i class="iconfont  icon-kongtiao" slot="icon"></i>
      <span slot="label" class="grid-center">空调维修</span>
    </grid-item>
  </grid>
  <grid style="float: right;margin-right: 4%;" >
    <grid-item class="grid_6" @on-item-click="goToRegister('6')">
      <i class="iconfont  icon-weixiugongguanli" slot="icon"></i>
      <span slot="label" class="grid-center">维修记录</span>
    </grid-item>

  </grid>
</div>

</template>

<script>
  import { Grid, GridItem,Card  } from 'vux'
  import { mapState, mapActions } from 'vuex'

    export default {
      name: "index",
      components: {
        Grid,
        GridItem,
        Card,
      },
      computed: {
        ...mapState({
          userInfo: state => state.userInfo,
          addressGps: state => state.addressGps
        }),
      },
      methods: {
        ...mapActions([
          "getUserInfo",
          "getLocationWx",
        ]),
        goToRegister:function(result){
          let title = "";
          let describe = "";
          if(1==result){
            title = "冰箱维修";
            describe = "现实中的她：是桥畔某处人家";
          }else if(2==result){
            title = "洗衣机维修";
            describe = "现实中的她：是桥畔某处人家";
          }else if(3==result){
            title = "换锁芯";
            describe = "现实中的她：是桥畔某处人家";
          }else if(4==result){
            title = "电视维修";
            describe = "现实中的她：是桥畔某处人家";
          }else if(5==result){
            title = "空调维修";
            describe = "现实中的她：是桥畔某处人家";
          }else if(6==result){
            title = "维修记录";
            describe = "现实中的她：是桥畔某处人家";
          }

          this.$store.commit('setRegister', {
            title:title,
            describe:describe,
            type:result,
          })

          this.$router.push({ name: 'register'})
        },
      },
      mounted() {
        //获取用户信息
        this.getUserInfo();
        //获取地理位置
        this.$store.dispatch({
          type: 'getLocationWx',
          url: window.location.href,
        })
      },
    }
</script>

<style scoped>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .weui-grids{
    width: 44%;
    display: inline-block;
  }
  .weui-grids:before {
    border-top: none;
  }
  .weui-grid{
    border-radius: 15%;
    height: 3rem;
    width: 46%;
  }
  .grid-center{
    color: #ffffff;
  }
  .iconfont{
    font-size: 0.3rem;
  }
  .float_div{
    position: absolute;
    width: 100%;
    margin-top: -0.8rem;
    text-align: center;
  }
  .float_div_1{
    background-color: #ffffff;
    height: 1.5rem;
    line-height: 1.5rem;
    width: 90%;
    display: inline-block;
    border-radius: 1rem;
  }
  .float_div_1 img{
    max-width: 1.1rem;
    max-height: 1.1rem;
    border-radius: 50%;
    border: 1px #000 solid;
    display: inline-block;
    margin-top: 0.2rem;
  }
  .float_div_1 .icon-icon6{
    display: inline-block;
    vertical-align: top;
    width: 0.8rem;
    font-size: 0.4rem;
  }
  .float_div_2{
    display: inline-block;
    width: 60%;
    line-height: 0.5rem;
    vertical-align: top;
    margin-top: 0.2rem;
    text-align: left;
  }
  .float_div_2 i{
    display: inline-block;
    vertical-align: top;
  }
  .float_div_2_span1{
    width: 85%;
    display: inline-block;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .float_div_2_span{
    width: 100%;
    display: inline-block;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .grid_1{
    background-color: #6CD7FF;
  }
  .grid_2{
    background-color: #FFB2DF;
  }
  .grid_3{
    background-color: #FCBCFF;
  }
  .grid_4{
    background-color: #FFCC91;
  }
  .grid_5{
    background-color: #FAD872;
  }
  .grid_6{
    background-color: #AB9CFA;
  }
</style>
