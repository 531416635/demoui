<template>
    <div>
      <tab  v-model="tabIndex">
        <tab-item selected>待付款</tab-item>
        <tab-item >待收货</tab-item>
        <tab-item >待评价</tab-item>
        <tab-item >售后</tab-item>
      </tab>

      <div>
        <swiper v-model="tabIndex" :style="{height: clientHeight}" :show-dots="false">
          <swiper-item class="swiper-demo-img" v-for="(item1, index) in 4" :key="index">
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
              <ul>
                <li v-for="(item,index1) in orderList" :key="index1">{{item}}</li>
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
            clientHeight: document.body.clientHeight,//监听窗口高度初始值
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
            orderList: state => state.orderList,
          }),
        },
        methods:{
          ...mapActions([
            "getUserOrder",
          ]),
          //下拉刷新
          onRefresh(done) {
            //第一步：先更新参数
            this.$store.commit('setOrderPage', {
              currentPage:1,
              pageSize:10,
              totalCount:0,
              isShowMore:true
            })
            //第二步：再获取用户维修记录
            this.getUserOrder();
            done() // call done
          },
          //上拉加载更多
          onInfinite(done) {
            this.getUserOrder();
            done()
          }
        },
      mounted() {
        //获取用户维修记录
        this.getUserOrder();

        /**
         * 解决屏幕高度的问题
         */
        let height1 = document.documentElement.clientHeight;
        // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
        this.clientHeight = (height1-44) +'px';
        // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
        const that = this;
        //高度改变时重新获取窗口高度
        window.onresize = function temp() {
          let height2 = document.documentElement.clientHeight;
          that.clientHeight =  (height2-44) +'px';
        };

      },
      watch: {
        //监听Tab页和Swiper页的切换
        tabIndex(newValue, oldValue) {
          //清除order数据
          this.$store.commit('clearOrderList')
          //第一步：先更新参数
          this.$store.commit('setOrderPage', {
            currentPage:1,
            pageSize:10,
            orderStatus:newValue,
            totalCount:0,
            isShowMore:true
          })
          //第二步：再获取用户维修记录
          this.getUserOrder();
        }
      }
    }
</script>

<style scoped  lang="less">
.vux-tab{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
}

</style>
