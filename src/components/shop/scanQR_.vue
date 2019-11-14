<template>
  <div class="content">
    <!-- <van-nav-bar title="扫码支付" left-arrow @click-left="$router.push({ name: 'index' })"></van-nav-bar> -->
    <div class="top_div">
      <div class="h3">
        <van-image
          round
          width="40px"
          height="40px"
          fit="cover"
          :src="total_list.img"
          style="vertical-align: middle;margin-right: 10px;"
        />
        {{total_list.name }}
      </div>
    </div>
    <div class="mian">
      <van-cell title="流通券" style="vertical-align: middle;">
        <template slot="label" style="vertical-align: middle;">
          <van-field v-model="m_ltq" placeholder="请输入流通券数量" type="number" />
        </template>
      </van-cell>
      <van-cell
        title="代金券"
        style="vertical-align: middle;"
        v-if="total_list.type==2||total_list.type==3"
      >
        <template slot="label" style="vertical-align: middle;">
          <van-field v-model="m_djq" placeholder="请输入代金券数量" type="number" />
        </template>
      </van-cell>
      <van-cell
        title="消费券"
        style="vertical-align: middle;"
        v-if="total_list.type==2||total_list.type==3"
      >
        <template slot="label" style="vertical-align: middle;">
          <van-field v-model="m_xfq" placeholder="请输入消费券数量" type="number" />
        </template>
      </van-cell>
    </div>
    <div class="btn_div1" @click="onSubmit">确定</div>
    <van-popup v-model="show" round position="bottom" closeable :style="{ height: '380px' }">
      <p class="popup_p">输入密码</p>
      <van-password-input
        :value="value"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
        style="margin-top:10px"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </van-popup>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "scanQR",
  data() {
    return {
      m_ltq: "",
      m_djq: "",
      m_xfq: "",
      showKeyboard: true,
      show: false,
      value: "",
      total_list: ""
    };
  },
  created() {
    // if (!this.$common.getCookie("token")) {
    //   this.$common.setCookie("token", "", -7);
    //   this.$router.replace({
    //     path: "/login"
    //   });
    // }
    // localStorage.getItem("phone")
    // if (!localStorage.getItem("token")) {
    //   localStorage.setItem("token", "");
    //   this.$router.replace({
    //     path: "/login"
    //   });
    // }
  },
  mounted() {
    // console.log(localStorage.getItem("token"));
    var that = this;
    if (localStorage.getItem("token")) {
      axios
        .get("http://ckback.dachunongchang.com/index.php/api/v1/getIdentity", {
          headers: {
            token: localStorage.getItem("token")
          },
          params: { phone: this.$route.params.phone }
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.total_list = res.data.data;
            // this.$common.setCookie("token", localStorage.getItem("token"));
          } else if (res.data.code == 401) {
            this.$common.setCookie("token", "", -7);
            this.$router.replace({
              path: "/login"
            });
          } else {
            this.$toast(res.data.msg);
          }
        });
    } else {
      this.$common.setCookie("token", "", -7);
      this.$router.replace({
        path: "/login"
      });
    }
    // this.http
    //   .get("getIdentity", {
    //     phone: this.$route.params.phone
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //     if (res.data.code == 200) {
    //       this.total_list = res.data.data;
    //     }
    //   });
  },
  methods: {
    onSubmit() {
      if (this.m_ltq == "" && this.m_djq == "" && this.m_xfq == "") {
        this.$toast("请输入支付金额");
      } else {
        this.show = true;
      }
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.show = false;
        // this.http
        //   .post("transfer", {
        //     phone: this.$route.params.phone,
        //     password: this.value, //	二级密码
        //     source: 2,
        //     lt: this.m_ltq, //			数量---当source=1，此参数必传
        //     xf: this.m_xfq, //		数量---当source=1，此参数必传
        //     dj: this.m_djq //	数量---当source=1，此参数必传
        //   })
        //   .then(res => {
        //     console.log(res.data);
        //     if (res.data.code == 200) {
        //       this.$toast.success("支付成功");
        //       this.$router.push({
        //         name: "pay_suc",
        //         params: {
        //           phone: JSON.stringify(this.total_list),
        //           count: JSON.stringify({
        //             lt: this.m_ltq,
        //             xf: this.m_xfq,
        //             dj: this.m_djq
        //           })
        //         }
        //       });
        //     } else {
        //       this.value = "";
        //     }
        //   });
        axios
          .post(
            "http://ckback.dachunongchang.com/index.php/api/v1/transfer",
            {
              phone: this.$route.params.phone,
              password: this.value, //	二级密码
              source: 2,
              lt: this.m_ltq, //			数量---当source=1，此参数必传
              xf: this.m_xfq, //		数量---当source=1，此参数必传
              dj: this.m_djq //	数量---当source=1，此参数必传
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(res => {
            console.log(res.data);
            // if (res.data.code == 200) {
            //   this.total_list = res.data.data;
            //   this.$common.setCookie("token", localStorage.getItem("token"));
            // } else if (res.data.code == 401) {
            //   this.$common.setCookie("token", "", -7);
            //   this.$router.replace({
            //     path: "/login"
            //   });
            // } else {
            //   this.$toast(res.data.msg);
            // }
            if (res.data.code == 200) {
              this.$toast.success("支付成功");
              this.$router.push({
                name: "pay_suc",
                params: {
                  phone: JSON.stringify(this.total_list),
                  count: JSON.stringify({
                    lt: this.m_ltq,
                    xf: this.m_xfq,
                    dj: this.m_djq
                  })
                }
              });
            } else if (res.data.code == 401) {
              this.$common.setCookie("token", "", -7);
              this.$router.replace({
                path: "/login"
              });
            } else {
              this.value = "";
              this.$toast(res.data.msg);
            }
            // else {
            //   this.value = "";
            // }
          });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
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
  margin-top: -46px;
}
.top_div {
  background-color: @bg_color;
  height: 160px;
  text-align: center;
  overflow: hidden;
  .h3 {
    height: 50px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    margin-top: 20px;
    vertical-align: middle;
  }
}
.mian {
  width: 345px;
  // height: 295px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-left: 15px;
  margin-top: -60px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.btn_div1 {
  width: 90%;
  margin-left: 5%;
  height: 44px;
  background: @bg_color;
  border-radius: 22px;
  text-align: center;
  line-height: 44px;
  font-weight: 500;
  font-size: 15px;
  color: rgba(255, 255, 255, 1);
  margin-top: 30px;
}
.popup_p {
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  border-bottom: 1px solid rgba(244, 244, 244, 1);
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
</style>