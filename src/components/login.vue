<template>
  <div class="content">
    <div class="top_div"></div>
    <div class="mian_div">
      <h3>登录</h3>
      <van-cell-group class="input_group">
        <van-field
          v-model="iphone"
          placeholder="请输入手机号"
          clearable
          :error-message="error_message"
          @input="f_focus"
        />
        <van-field
          v-model="password"
          type="password"
          placeholder="请输入密码"
          class="ipnt"
          :error="error_password"
        />
        <!-- :error-message="error_password" -->
      </van-cell-group>
      <!-- <div class="btn_div">登录</div> -->
      <div class="btn_div1" @click="f_login">登录</div>
      <div class="bom_p">
        <router-link to="forget">
          <span>忘记密码</span>
        </router-link>
        <!-- <router-link to="register"> -->
        <span
          style="text-align: right;"
          @click="$router.push({ name: 'register', params: { code:'0' } })"
        >注册</span>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      iphone: localStorage.getItem("phone"),
      password: "",
      error_message: "",
      error_password: false
    };
  },
  methods: {
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
        if (this.password) {
          this.error_password = false;

          localStorage.setItem("phone", this.iphone);
          console.log(localStorage.getItem("phone"));

          this.http
            .post("login", {
              password: this.password, //	当type=2时传
              phone: this.iphone
            })
            .then(res => {
              console.log(res.data);
              if (res.data.code == 200) {
                // this.$toast.success("登录成功");
                localStorage.setItem("token", res.data.data.token);
                this.$common.setCookie("token", res.data.data.token);
                this.$router.push({ name: "index" });
              }
            });
        } else {
          this.error_password = true;
        }
      } else {
        this.error_message = "手机号格式错误";
        if (this.password) {
          this.error_password = false;
        } else {
          this.error_password = true;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../style/baseColor.less);
.content {
  width: 100%;
  height: 100%;
  margin-top: -46px;
}
.top_div {
  width: 100%;
  height: 210px;
  background-color: @bg_color;
  border-radius: 0 0 50px 50px;
}
.mian_div {
  width: 345px;
  height: 359px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 8px 0px rgba(227, 227, 227, 0.43);
  border-radius: 20px;
  margin-top: -90px;
  margin-left: 15px;
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