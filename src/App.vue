<template>
  <div id="app">
    <!-- <router-view/> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="less" scoped>
/deep/.van-nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
#app {
  margin-top: 46px;
}
</style>
