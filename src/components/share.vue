<template>
  <div class="content">
    <van-nav-bar title="分享" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <div class="img_div" id="captureId">
      <div class="top">
        <div id="qrcode" ref="qrcode" style="width:171px;height:171px"></div>
      </div>
      <div class="bottom">
        <p>邀请码</p>
        <h3>{{yqm}}</h3>
        <!-- <div class="btn_div">复制</div> -->
        <button
          class="tag-read btn_div"
          :data-clipboard-text="yqm"
          @click="copy"
          v-show="s_copy_btn"
        >复制</button>
      </div>
    </div>
    <div class="imd_save_div" @click="toImg">保存图片</div>
    <van-popup v-model="show" style="width:80%" @close="s_copy_btn = true">
      <p class="tp_p">长按图片即可保存</p>
      <img class="show_img" :src="dataURL" alt style="width:100%" />
    </van-popup>
    <!-- <img class="show_img" :src="dataURL" alt style="width:100%" /> -->
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import Clipboard from "clipboard";
import html2canvas from "html2canvas";
export default {
  name: "share",
  data() {
    return {
      url: "", // "http://192.168.1.17:8080/#/register/" + this.$route.params.codesp,
      yqm: "",
      // firstFlag: true,
      dataURL: "",
      s_copy_btn: true,
      show: false
    };
  },
  created() {
    this.http.get("my", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.yqm = res.data.data.spread_code;
        // this.url = "http://192.168.1.17:8080/#/register/" + this.yqm;
          this.url = "http://ckapp.dachunongchang.com/#/register/" + this.yqm;
        this.$nextTick(function() {
          this.qrcode(this.url);
        });
      }
    });
  },
  methods: {
    // 图片保存到相册
    savePicture(Url) {
      var blob = new Blob([""], { type: "application/octet-stream" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = Url;
      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0];
      var e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      console.log(e);
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
    },

    // 生成图片
    toImg() {
      // 电脑上可以下载图片，，手机没有反应
      // var that = this;
      // html2canvas(document.querySelector("#captureId"))
      //   .then(canvas => {
      //     console.log(canvas);
      //     that.dataURL = canvas.toDataURL("image/png");
      //     that.savePicture(that.dataURL);
      //   })
      //   .catch(error => {});
      this.s_copy_btn = false;
      setTimeout(() => {
        this.show = true;
        var that = this;
        html2canvas(document.querySelector("#captureId"))
          .then(canvas => {
            console.log(canvas);
            that.dataURL = canvas.toDataURL("image/png");
          })
          .catch(error => {});
      }, 100);
    },
    qrcode(a) {
      let qrcode = new QRCode("qrcode", {
        width: 170, // 设置宽度，单位像素
        height: 170, // 设置高度，单位像素
        text: a // 设置二维码内容或跳转地址
      });
    },

    copy() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        // console.log("复制成功");
        this.$toast.success("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$toast.fail("该浏览器不支持自动复制,请手动复制");
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
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
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
.img_div {
  width: 345px;
  height: 413px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 3px 0px rgba(222, 222, 222, 0.5);
  border-radius: 5px;
  margin-left: 15px;
  margin-top: 30px;
  .top {
    width: 100%;
    height: 281px;
    background: @bg_color;
    border-radius: 6px 6px 0px 0px;
    position: relative;
    #qrcode {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background-color: #fff;
      // width: 165px;
      // height: 165px;
      padding: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .bottom {
    text-align: center;
    p {
      font-size: 15px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
    }
    h3 {
      line-height: 40px;
      font-size: 18px;
    }
    .btn_div {
      display: inline-block;
      width: 90px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid rgba(198, 198, 198, 1);
      color: rgba(153, 153, 153, 1);
      height: 30px;
      line-height: 26px;
      font-size: 15px;
      background-color: #fff;
    }
  }
}
.imd_save_div {
  width: 345px;
  height: 38px;
  background: @bg_color;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 38px;
  text-align: center;
  margin-left: 15px;
  margin-top: 50px;
}
.tp_p {
  width: 100%;
  text-align: center;
  background-color: #494949;
  color: #fff;
  line-height: 50px;
}
</style>
