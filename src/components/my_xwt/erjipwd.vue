<template>
  <div class="content">
    <van-nav-bar title="二级密码" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <div class="mian_div">
      <van-cell-group class="input_group">
        <van-field
          v-model="iphone"
          placeholder="请输入手机号"
          clearable
          :error-message="error_message"
          @input="f_focus"
        />
        <van-field v-model="yzm" placeholder="请输入验证码" class="ipnt" :error="error_pyzm">
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="getyzm(60)"
            :disabled="!disabled"
          >{{yzm_html}}</van-button>
        </van-field>
        <van-field
          v-model="password"
          type="password"
          :maxlength="6"
          placeholder="请输入新二级密码，6位数字"
          class="ipnt"
          :error="error_password"
        />
        <van-field
          v-model="password2"
          type="password"
          :maxlength="6"
          placeholder="请再次输入新二级密码"
          class="ipnt"
          :error="error_password2"
        />
        <!-- <van-field
          v-model="yqm"
          type="password"
          placeholder="请输入邀请码(必填)"
          class="ipnt"
          :error="error_yqm"
        />-->
        <!-- :error-message="error_password" -->
      </van-cell-group>
      <!-- <div class="btn_div">登录</div> -->
      <div class="btn_div1" @click="f_login">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "erjipwd",
  data() {
    return {
      iphone: this.$route.params.phone,
      yzm: "",
      password: "",
      password2: "",
      yqm: "",
      error_message: "",
      error_pyzm: false,
      error_password: false,
      error_password2: false,
      error_yqm: false,
      disabled: true,
      yzm_html: "验证码"
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
    getyzm(wait) {
      if (!this.$common._verPhone(this.iphone)) {
        this.error_message = "手机号格式错误";
      } else {
        this.http
          .post("getCaptcha", { phone: this.iphone, type: 1 })
          .then(res => {
            console.log(res.data);
          });
        this.getyzm01(wait);
      }
    },
    getyzm01(wait) {
      let _this = this;
      let _wait = wait;
      if (wait == 0) {
        this.disabled = true;
        this.yzm_html = "验证码";
        wait = _wait;
      } else {
        this.disabled = false;
        this.yzm_html = wait + "s";
        wait--;
        // _this.getyzm01(wait);

        setTimeout(function() {
          _this.getyzm01(wait);
        }, 1000);
      }
    },
    f_focus() {
      if (this.$common._verPhone(this.iphone)) {
        this.error_message = "";
      } else {
        this.error_message = "手机号格式错误";
      }
    },
    f_login() {
      if (this.$common._verPhone(this.iphone)) {
        this.error_message = "";
        if (this.yzm) {
          this.error_pyzm = false;
          if (this.password) {
            this.error_password = false;
            if (this.password2) {
              this.error_password2 = false;

              this.http
                .post("savePayPassword", {
                  password: this.password, //	密码
                  password1: this.password2, //		确认密码
                  phone: this.iphone, //	手机号
                  code: this.yzm //	手机验证码
                })
                .then(res => {
                  console.log(res.data);
                  if (res.data.code == 200) {
                    this.$toast.success("修改二级密码成功");
                    this.$router.go(-1);
                  }
                });
            } else {
              this.error_password2 = true;
            }
          } else {
            this.error_password = true;
          }
        } else {
          this.error_pyzm = true;
        }
      } else {
        this.error_message = "手机号格式错误";
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  height: 100;
}
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
.mian_div {
  margin-top: 20px;
  h3 {
    text-align: center;
    height: 80px;
    font-size: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 80px;
  }
  .input_group {
    width: 90%;
    margin-left: 5%;
  }
  .ipnt {
    margin-top: 30px;
  }
  .btn_div {
    width: 90%;
    margin-left: 5%;
    height: 44px;
    background: @btn_dis_color;
    border-radius: 22px;
    text-align: center;
    line-height: 44px;
    font-weight: 500;
    font-size: 15px;
    color: rgba(255, 255, 255, 1);
    margin-top: 30px;
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
  .bom_p {
    width: 84%;
    margin-left: 8%;
    height: 65px;
    line-height: 65px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    font-size: 15px;
    span {
      width: 49%;
      display: inline-block;
      height: 100%;
    }
  }
}
/deep/ [class*="van-hairline"]::after {
  border-top: 1px solid #fff;
}
</style>