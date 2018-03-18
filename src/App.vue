<template>
  <div id="app" style="height: 100%">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import {  Loading, TransferDom } from 'vux'
  import { mapState, mapActions } from 'vuex'


  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {
      Loading
    },
    computed:{
      ...mapState({
        isLoading: state => state.vux.isLoading,
      }),
    }

}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
