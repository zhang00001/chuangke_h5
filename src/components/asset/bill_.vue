<template>
  <div class="content">
    <van-nav-bar title="账单" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab :title="itemem" v-for="(itemem,i) in vantab" :key="i">
        <van-cell style="vertical-align: middle;">
          <template slot="title" style="vertical-align: middle;">
            <h3 class="h31">流通券兑换</h3>
            <p class="p1">消费券</p>
            <p class="p1">2019-09-26 19:00</p>
          </template>
          <template slot="default" style="vertical-align: middle;">
            <h3 class="h32">+100</h3>
          </template>
        </van-cell>
      </van-tab>
    </van-tabs>
    <!-- <van-dialog v-model="show" style="padding:20px 0 0 0">
      <p class="v_a_p">兑换数量：2424</p>
      <p class="v_a_p">兑换数量：2424</p>
       @click="f_Dialog"
    </van-dialog> -->
  </div>
</template>
<script>
export default {
  name: "bill_",
  data() {
    return {
      active: 0,
      show: false,
      vantab: ["全部", "流通券", "消费券", "代金券"]
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
  methods: {
    f_Dialog() {
      this.show = true;
      return;
      this.$dialog
        .alert({
          message: "弹窗内容"
        })
        .then(() => {
          // on close
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(244, 244, 244, 1);
}
.h31 {
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.p1 {
  font-size: 14px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.p3 {
  font-size: 14px;
  font-weight: 500;
  color: rgba(238, 88, 90, 1);
}
.p2 {
  font-size: 15px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.h32 {
  font-size: 18px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.v_a_p {
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 30px;
}
/deep/.van-nav-bar {
  background-color: @bg_color;
  .van-nav-bar__title {
    color: rgba(255, 255, 255, 1);
  }
  .van-nav-bar__left {
    .van-icon {
      color: rgba(255, 255, 255, 1);
    }
  }
  .van-nav-bar__right {
    img {
      margin-top: 10px;
    }
  }
}
/deep/.van-tabs__nav {
  .van-tab {
    background-color: @bg_color;
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
  .van-tabs__line {
    background-color: #fff;
    border-radius: 3px;
  }
}
</style>