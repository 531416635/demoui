<template>
    <div>
      <tab  v-model="index1">
        <tab-item selected  @on-item-click="changeIndex">待付款</tab-item>
        <tab-item >待收货</tab-item>
        <tab-item >待评价</tab-item>
        <tab-item >售后</tab-item>
      </tab>

      <div>
        <swiper v-model="index1" height="100px" :show-dots="false" @on-index-change="changeIndex">
          <swiper-item v-for="(item, index) in list2" :key="index">
            <div class="tab-swiper vux-center">{{item}} Container</div>
          </swiper-item>
        </swiper>
      </div>

    </div>
</template>

<script>

  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
  import { mapState, mapActions } from 'vuex'

  const list = () => ['精选', '美食', '电影', '酒店', '外卖']
    export default {
        name: "detail",
        data() {
          return {
            list2: list(),
            index1: 0,
          }
        },
        components: {
          Tab,
          TabItem,
          Swiper,
          SwiperItem
        },
        computed: {
          ...mapState({
            orderPage: state => state.orderPage,
          }),
        },
        methods:{
          ...mapActions([
            "getUserOrder",
          ]),
          changeIndex:function(){
            //第一步：先更新参数
            this.$store.commit('setOrderPage', {
              currentPage:1,
              pageSize:10,
              orderStatus:this.index1,
            })
            //第二步：再获取用户维修记录
            this.getUserOrder();
          }
        },
      mounted() {
        //获取用户维修记录
        this.getUserOrder();

      },
    }
</script>

<style scoped  lang="less">

</style>
