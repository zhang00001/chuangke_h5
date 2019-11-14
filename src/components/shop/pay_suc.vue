<template>
  <div class="content">
    <van-nav-bar title="支付结果" left-arrow @click-left="$router.push({ name: 'index' })"></van-nav-bar>
    <p class="p1" style=" margin-top: 80px;">收款方：</p>
    <div class="h3" style="text-align: center;">
      <van-image
        round
        width="40px"
        height="40px"
        fit="cover"
        :src="JSON.parse(this.$route.params.phone).img"
        style="vertical-align: middle;margin-right: 10px;"
      />
      {{JSON.parse(this.$route.params.phone).name}}
    </div>
    <p class="p1">支付数量：</p>
    <div class="h3" v-if="JSON.parse(this.$route.params.count).lt">
      <span>流通券：</span>
      {{JSON.parse(this.$route.params.count).lt}}
    </div>
    <div class="h3" v-if="JSON.parse(this.$route.params.count).dj">
      <span>代金券：</span>
      {{JSON.parse(this.$route.params.count).dj}}
    </div>

    <div class="h3" v-if="JSON.parse(this.$route.params.count).xf">
      <span>消费券：</span>
      {{JSON.parse(this.$route.params.count).xf}}
    </div>
    <div class="h3 h4" style="text-align: center;margin-top: 30px">
      <van-icon name="success" color="#6356FF" size="30px" style="vertical-align: middle;" />支付成功!
    </div>
  </div>
</template>
<script>
export default {
  name: "pay_suc",
  data() {
    return {};
  },
  created() {
    // if (!this.$common.getCookie("token")) {
    //   this.$common.setCookie("token", "", -7);
    //   this.$router.replace({
    //     path: "/login"
    //   });
    // }
  },
  mounted() {
    console.log(JSON.parse(this.$route.params.phone));
    console.log(JSON.parse(this.$route.params.count));
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  height: 100%;
}

.h3 {
  line-height: 35px;
  font-size: 16px;
  vertical-align: middle;
  span {
    display: inline-block;
    width: 190px;
    text-align: right;
  }
}
.h4 {
  font-size: 18px;
  font-weight: 600;
}
.p1 {
  margin-top: 20px;
  font-size: 16px;
  text-indent: 2em;
  // line-height: 30px;
}
</style>