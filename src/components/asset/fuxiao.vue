<template>
  <div class="content">
    <van-nav-bar title="复消记录" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-cell
      v-for="(item,i) in data_list"
      :key="i"
      :title="item.years+'年'+item.month+'月复消积分'"
      :value="item.fx_yj"
    />
    <p style=" text-align: center;line-height: 50px;font-size: 14px;color: #969799;">没有更多了</p>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  name: "fuxiao",
  data() {
    return {
      data_list: ""
    };
  },
  created() {
    if (!this.$common.getCookie("token")) {
      this.$common.setCookie("token", "", -7);
      this.$router.replace({
        path: "/login"
      });
    }
  },
  mounted() {
    this.http.get("resultsLog", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.data_list = res.data.data;
      }
    });
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  min-height: 100vh;
  background: #f4f4f4;
}
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
</style>