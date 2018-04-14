<template>
    <div>
      <tab  v-model="tabIndex">
        <tab-item selected  @on-item-click="changeIndex">待付款</tab-item>
        <tab-item >待收货</tab-item>
        <tab-item >待评价</tab-item>
        <tab-item >售后</tab-item>
      </tab>

      <div>
        <swiper v-model="tabIndex" height="5rem" :show-dots="false">
          <swiper-item class="swiper-demo-img" v-for="(item1, index) in 4" :key="index">
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
              <ul>
                <li v-for="(item,index1) in orderListData" :key="index1">{{item}}</li>
                <li v-for="(item,index1) in orderDownData" :key="index1">{{item}}</li>
              </ul>
            </v-scroll>
          </swiper-item>
        </swiper>
      </div>

    </div>
</template>

<script>

  import Scroll from '@/components/utils/scroll'

  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
  import { mapState, mapActions } from 'vuex'

    export default {
        name: "detail",
        data() {
          return {
            tabIndex: 0,
          }
        },
        components: {
          Tab,
          TabItem,
          Swiper,
          SwiperItem,
          'v-scroll': Scroll
        },
        computed: {
          ...mapState({
            orderPage: state => state.orderPage,
            orderListData: state => state.orderListData,
            orderDownData: state => state.orderDownData,
          }),
        },
        methods:{
          ...mapActions([
            "getUserOrder",
          ]),

        },
      mounted() {
        //获取用户维修记录
        this.getUserOrder();

      },
      watch: {
        //监听Tab页和Swiper页的切换
        tabIndex(newValue, oldValue) {
          //第一步：先更新参数
          this.$store.commit('setOrderPage', {
            currentPage:1,
            pageSize:10,
            orderStatus:newValue,
          })
          //第二步：再获取用户维修记录
          this.getUserOrder();
        }
      }
    }
</script>

<style scoped  lang="less">

</style>
