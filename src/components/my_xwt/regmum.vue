<template>
  <div class="content">
    <van-nav-bar
      title="会员"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push({ name: 'share' })"
    >
      <img src="../../assets/shangchuan@3x.png" slot="right" alt   style="vertical-align: middle; width: 22px;height: 22px;"/>
    </van-nav-bar>
    <div class="top_div">
      <div class="h3">普通会员</div>
      <div class="div">
        <span @click="$router.push({ name: 'fans' })">我的粉丝</span>
        <img src="../../assets/jiantou.png" alt />
        <span>下一级：VIP会员</span>
      </div>
    </div>
    <div class="btn_div">
      <p @click="f_tuj(1)" v-if="total_List.t==0">推荐人确认</p>
      <p style="background:#999999" v-if="total_List.t==1">推荐人确认中</p>
      <p @click="f_tuj(2)" v-if="total_List.l==0">领导人确认</p>
      <p style="background:#999999" v-if="total_List.l==1">领导人确认中</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "regmum",
  data() {
    return {
      total_List: ""
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
    this.http.get("getUpgradeStatus", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.total_List = res.data.data;
      }
    });
  },
  methods: {
    f_tuj(type) {
      this.http.get("upgrade", { type: type }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          if (type == 1) {
            this.$toast.success("请求推荐人确认成功");
            this.$router.go(-1);
          } else {
            this.$toast.success("请求领导人确认成功");
            this.$router.go(-1);
          }
        }
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
.top_div {
  background-color: @bg_color;
  height: 160px;
  text-align: center;
  overflow: hidden;
  .h3 {
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    margin-top: 20px;
  }
  .div {
    width: 80%;
    margin-left: 10%;
      display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    line-height: 50px;
    span {
      color: rgba(255, 255, 255, 1);
      font-size: 15px;
      font-weight: 500;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
.btn_div {
  text-align: center;
  margin-top: 350px;
  p {
    display: inline-block;
    width: 155px;
    height: 30px;
    background: @bg_color;
    border-radius: 20px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
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
      // margin-top: 10px;
    }
  }
}
</style>