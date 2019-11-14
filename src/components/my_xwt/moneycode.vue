<template>
  <div class="content">
    <van-nav-bar title="我的收款码" left-arrow @click-left="$router.go(-1)" />
    <div class="main">
      <p class="p1">惠生活</p>
      <div class="code">
        <div id="qrcode" ref="qrcode"></div>
      </div>
      <div class="p2">
        <img src="../../assets/saoyisao (2).png" alt />
        打开惠生活 扫一扫
      </div>
    </div>
    <!-- <p @click="callByAndroidScan('130000000051572243303')">111111</p> -->
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "moneycode",
  data() {
    return {
      url:
        "ck://sc=" +
        this.$common.getCookie("phone") +
        Math.round(new Date() / 1000) +"#"+
        this.$common.getCookie("token")
      // "http://192.168.1.19:8080/#/scanQR/" + this.$common.getCookie("phone")
      // "http://ckapp.dachunongchang.com/#/scanQR/" +
      // this.$common.getCookie("phone")
    };
  },
  created() {
    window.callByAndroidScan = function() {
      alert("11111");
    }; //this.callByAndroidScan;
    console.log(this.callByAndroidScan);
    console.log(Math.round(new Date() / 1000));
    console.log(this.url);
    if (!this.$common.getCookie("token")) {
      this.$common.setCookie("token", "", -7);
      this.$router.replace({
        path: "/login"
      });
    }
    this.$nextTick(function() {
      this.qrcode(this.url);
    });
  },
  mounted() {
    window.callByAndroidScan = function() {
      alert("11111");
    };
    console.log(this.callByAndroidScan);
  },
  methods: {
    qrcode(a) {
      let qrcode = new QRCode("qrcode", {
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: a // 设置二维码内容或跳转地址
      });
    },
    callByAndroidScan(string) {
      alert("11111");
      var phrone = string.slice(0, 11);
      this.$router.push({ name: "scanQR", params: { phone: phrone } });
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  min-height: calc(100vh - 100px);
  background: @bg_color;
  margin-top: -46px;
  padding-top: 100px;
}

.main {
  width: 325px;
  height: 454px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 0px 12px 0px rgba(30, 14, 238, 1);
  border-radius: 30px;
  margin-left: 25px;
  // margin-top: 60px;
  text-align: center;
  padding-top: 1px;
  .p1 {
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 100px;
  }
  .code {
    width: 202px;
    height: 202px;
    display: inline-block;
  }
  .p2 {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 100px;
    vertical-align: middle;
    img {
      vertical-align: middle;
    }
  }
}
</style>