<template>
  <div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import Tabbar from '@/components/index/Tabbar'

  export default {
    components: {
      Tabbar,
    }
  }
</script>

<style scoped>
  Tabbar{
    position: fixed;
  }
</style>
