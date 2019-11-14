<template>
  <div class="content">
    <van-nav-bar
      title="兑换流通券"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="历史记录"
      @click-right="$router.push({ name: 'record' })"
    ></van-nav-bar>
    <div class="concat"></div>
    <div class="top_div">
      <p class="v_p_p">汇率</p>
      <h3 class="v_p_h3">100USDT={{huilv*1000}}流通券</h3>
      <!-- <div class="h3">普通会员</div> -->
      <div class="div">
        <span>USDT</span>
        <img src="../../assets/jiantou copy.png" alt />
        <span>流通券</span>
      </div>
      <div class="div">
        <input type="text" v-model="value1" placeholder="单行输入" name id />
        <input type="text" v-model="value2" placeholder="单行输入" name id style=" text-align: right;" />
        <!-- <van-field v-model="value" placeholder="请输入用户名" /> -->
      </div>
      <p class="p_div">
        兑换说明
        <br />1. 根据汇率计算出想要兑换的流通券数量
        <br />2. 点击下方[钱包地址]获取收款地址
        <br />3. 打开区块链钱包向该地址中转入对应数量的USDT并截图
        <br />4. 点击下方[提交凭证].上传转币截图到平台， 等待管理员审核，审核时间为1-2个工作日，请耐心等待
        <br />5. 长时间未审核或者审核后流通券未及时到账，请联系客服进行处理
        <br />6. 转账前请务必确认币种和钱包地址币种是否一致，如不一致而造成的损失，平台概不负责
      </p>
    </div>
    <div class="btn_div">
      <p class="p1" @click="f_wallet">钱包地址</p>
      <p @click="$router.push({ name: 'submit', params: { wallet: yqm } })">提交凭证</p>
    </div>
    <van-dialog
      v-model="show"
      :showCancelButton="false"
      :showConfirmButton="false"
      style="padding:20px 0 0 0"
      id="captureId"
    >
      <p class="v_a_p1">USDT-钱包地址</p>
      <p class="v_a_p2">{{yqm}}</p>
      <div class="top">
        <!-- <div id="qrcode" ref="qrcode"></div> -->
        <img :src="url" alt />
        <!-- <van-image width="240" :src="url" /> style="background-repeat:no-repeat;"-->
        <!-- <div class="img" :style="{backgroundImage:'url(' + url + ')'}"  ></div> -->
      </div>
      <p class="v_a_p2">说明：{{shuomign}}</p>
      <div class="btn_div" style="padding:0 0 20px 0">
        <!-- <p class="p1" @click="copy">复制地址</p> -->
        <button
          class="tag-read btn_div111"
          :data-clipboard-text="yqm"
          @click="copy"
          v-show="s_copy_btn"
        >复制</button>
        <p @click="toImg" v-show="s_copy_btn">保存图片</p>
      </div>
    </van-dialog>
    <van-popup v-model="show2" style="width:80%" @close="s_copy_btn = true">
      <p class="tp_p">长按图片即可保存</p>
      <img class="show_img" :src="dataURL" alt style="width:100%" />
    </van-popup>
    <!-- <canvas
      id="cvs"
      width="1024"
      height="768"
      style="border:1px solid #ccc;margin:20px auto;display: block;"
    >当前浏览器不支持canvas</canvas>-->
  </div>
</template>
<script>
//获取canvas元素

import QRCode from "qrcodejs2";
import Clipboard from "clipboard";
import html2canvas from "html2canvas";
export default {
  name: "change_ltq",
  data() {
    return {
      value1: "",
      value2: "",
      show: false,
      url: "",
      yqm: "35452234223523532535252522",
      dataURL: "",
      show2: false,
      s_copy_btn: true,
      huilv: "",
      shuomign: ""
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
    this.http.get("getInterestRate", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.huilv = res.data.data.v2;
      }
    });
    this.http.get("getSkAddress", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.yqm = res.data.data.v;
        this.url = res.data.data.v1;
        // this.url = URL.createObjectURL(res.data.data.v1);
        this.shuomign = res.data.data.v2;
      }
    });

    // var cvs = document.getElementById("cvs");
    // console.log(document.querySelector("canvas"));
    // //创建image对象
    // var imgObj = new Image();
    // imgObj.src =
    //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571979429733&di=63c785c92e9d243857305ddfcb7bb00f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D4d5e01bdba389b5038ffe05ab534e5f1%2F8cca9b8fa0ec08fa2ab208045aee3d6d54fbda28.jpg";
    // //待图片加载完后，将其显示在canvas上
    // imgObj.onload = function() {
    //   var ctx = cvs.getContext("2d");
    //   ctx.drawImage(this, 0, 0); //this即是imgObj,保持图片的原始大小：470*480
    //   //ctx.drawImage(this, 0, 0,1024,768);//改变图片的大小到1024*768
    // };
    // console.log(cvs);
  },
  methods: {
    f_wallet() {
      this.show = true;
      // this.$nextTick(function() {
      //   this.qrcode(this.url);
      // });
    },
    qrcode(a) {
      let qrcode = new QRCode("qrcode", {
        width: 160, // 设置宽度，单位像素
        height: 160, // 设置高度，单位像素
        text: a // 设置二维码内容或跳转地址
      });
    },
    copy() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        // console.log("复制成功");
        this.$toast.success("复制成功");
        this.show = false;
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
    },
    // 生成图片
    toImg() {
      this.s_copy_btn = false;
      setTimeout(() => {
        this.show2 = true;
        var that = this;
        html2canvas(document.querySelector(".van-dialog__content"), {
          useCORS: true, // 【重要】开启跨域配置
          allowTaint: true, //允许跨域图片
          taintTest: false, //是否在渲染前测试图片
          onrendered: function(canvas) {
            that.dataURL = canvas.toDataURL("image/png");
          }
        });

        // html2canvas(document.querySelector(".van-dialog__content"))
        //   .then(canvas => {
        //     console.log(canvas);
        //     that.dataURL = canvas.toDataURL("image/png");
        //   })
        //   .catch(error => {});
      }, 100);
    }
  },
  //监听list数据变化
  watch: {
    // show: {
    //   deep: true, //深度监听
    //   handler: function(newVal, oldVal) {
    //     // console.log(newVal);
    //     if (newVal == false) {
    //       document.getElementById("qrcode").innerHTML = "";
    //     }
    //   }
    // },
    value1: {
      deep: true, //深度监听
      handler: function(newVal, oldVal) {
        this.value2 = newVal * this.huilv;
      }
    },
    value2: {
      deep: true, //深度监听
      handler: function(newVal, oldVal) {
        this.value1 = newVal / this.huilv;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  height: 100%;
}
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
.top_div {
  // background-color: @bg_color;
  // height: 160px;
  // overflow: hidden;

  width: 90%;
  margin-left: 5%;
  .v_p_p {
    font-size: 15px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 30px;
  }
  .v_p_h3 {
    font-size: 22px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
  }

  .div {
    // width: 80%;
    // margin-left: 10%;
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
      color: @bg_color;
      font-size: 15px;
      font-weight: 600;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    input {
      height: 30px;
      border: 0;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
    }
  }
}
.p_div {
  font-size: 14px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  line-height: 26px;
  margin-top: 30px;
}
.btn_div {
  text-align: center;
  margin-top: 50px;
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
  .p1 {
    border: 1px solid rgba(99, 86, 255, 1);
    background-color: #fff;
    color: @bg_color;
  }
}
.v_a_p1 {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.v_a_p2 {
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.top {
  width: 100%;
  // height: 230px;
  // border-radius: 6px 6px 0px 0px;
  position: relative;
  text-align: center;
  padding-bottom: 10px;
  img {
    width: 75%;
  }
  .img {
    display: inline-block;
    width: 75%;
    height: 230px;
  }
  #qrcode {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #fff;
    width: 150px;
    height: 150px;
    // padding: 20px;
  }
}
.btn_div111 {
  display: inline-block;
  width: 155px;
  height: 30px;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid rgba(99, 86, 255, 1);
  background-color: #fff;
  color: @bg_color;
}
/deep/.van-nav-bar {
  .van-nav-bar__right {
    .van-nav-bar__text {
      color: rgba(153, 153, 153, 1);
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