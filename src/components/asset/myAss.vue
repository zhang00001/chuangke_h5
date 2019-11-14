<template>
  <div class="content">
    <van-nav-bar
      title="我的资产"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="收款码"
      @click-right="$router.push({ name: 'moneycode' })"
    ></van-nav-bar>
    <div class="top_div">
      <div class="h3">{{data_list.lt}}</div>
      <p>流通券</p>
    </div>
    <div class="table_div">
      <van-grid :border="false" style="margin-top: 5px;">
        <van-grid-item>
          <h3>{{data_list.xf}}</h3>
          <p class="v_g_i_p">消费券</p>
        </van-grid-item>
        <van-grid-item>
          <h3>{{data_list.dj}}</h3>
          <p class="v_g_i_p">代金券</p>
        </van-grid-item>
        <van-grid-item>
          <h3>{{data_list.yj}}</h3>
          <p class="v_g_i_p">本月业绩</p>
        </van-grid-item>
        <van-grid-item>
          <h3>{{data_list.fx_yj}}</h3>
          <p class="v_g_i_p">本月复消</p>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="li_div1">
      <van-cell is-link style="vertical-align: middle;" @click="$router.push({ name: 'exchange' })">
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../../assets/Group@3x.png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">兑换中心</span>
        </template>
      </van-cell>
      <van-cell is-link style="vertical-align: middle;" @click="f_tixian">
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../../assets/Group 2@3x (2).png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">提现</span>
        </template>
      </van-cell>
      <!-- @click="$router.push({ name: 'zhuanchu' })" -->
      <van-cell is-link style="vertical-align: middle;" @click="f_zhuanchu">
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../../assets/Group 3@3x.png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">转出</span>
        </template>
      </van-cell>
    </div>
    <div class="li_div1">
      <van-cell is-link style="vertical-align: middle;" @click="$router.push({ name: 'bill' })">
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../../assets/Group@3x(1).png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">账单</span>
        </template>
      </van-cell>
      <van-cell
        is-link
        style="vertical-align: middle;"
        @click="$router.push({ name: 'performance' })"
      >
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../../assets/Group 2@3x(1).png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">业绩记录</span>
        </template>
      </van-cell>
      <van-cell is-link style="vertical-align: middle;" @click="$router.push({ name: 'fuxiao' })">
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../../assets/Group 3@3x(1).png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">复消记录</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
export default {
  name: "myAss",
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
    this.http.get("myAccount", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.data_list = res.data.data;
      }
    });
  },
  methods: {
    f_zhuanchu() {
      if (this.$common.getCookie("pay_password") == 1) {
        this.$router.push({ name: "zhuanchu" });
      } else {
        this.$toast("您还未设置二级密码，请先在个人资料中设置二级密码");
      }
    },
    f_tixian() {
      if (this.$common.getCookie("pay_password") == 1) {
        this.$router.push({ name: "withdraw" });
      } else {
        this.$toast("您还未设置二级密码，请先在个人资料中设置二级密码");
      }
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
.top_div {
  background-color: @bg_color;
  height: 150px;
  text-align: center;
  overflow: hidden;
  .h3 {
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    margin-top: 20px;
  }
  p {
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
  }
}
.table_div {
  width: 345px;
  height: 75px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-left: 15px;
  margin-top: -50px;
  overflow: hidden;
  .v_g_i_p {
    font-size: 12px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
}
.li_div1 {
  width: 345px;
  height: 170px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-left: 15px;
  margin-top: 10px;
  padding-top: 10px;
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
    .van-nav-bar__text {
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>