<template>
  <div class="content">
    <router-view />
    <van-tabbar route active-color="#695DFF">
      <van-tabbar-item to="/index">
        <!-- <van-tabbar-item to="/home"> -->
        <span>首页</span>
        <img slot="icon" replace slot-scope="props" :src="props.active ?icon.active : icon.normal" />
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ?icon2.active : icon2.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      active: 1,
      icon: {
        normal: require("../assets/shouye@3x (1).png"),
        active: require("../assets/shouye@3x.png")
      },
      icon2: {
        normal: require("../assets/Page 1@3x (3).png"),
        active: require("../assets/Page 1@3x (4).png")
      }
    };
  },
  created() {
    if (!this.$common.getCookie("token")) {
      this.$common.setCookie("token", "", -7);
      this.$router.replace({
        path: "/login"
      });
    }
    if (this.$route.path === "/") {
      console.log("----/");
      this.$router.push({ name: "index" });
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../style/baseColor.less);
.content {
  width: 100%;
  height: 100%;
}
</style>