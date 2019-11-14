<template>
  <div class="content">
    <van-nav-bar title="转出" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <p class="txsl_p">
      <span></span>类型
    </p>
    <van-radio-group v-model="sub_value.type" checked-color="#6356FF">
      <van-cell-group>
        <van-cell title="流通券" clickable @click="sub_value.type = '1'">
          <van-radio slot="right-icon" name="1" />
        </van-cell>
        <van-cell title="消费券" clickable @click="sub_value.type = '2'">
          <van-radio slot="right-icon" name="2" />
        </van-cell>
        <van-cell title="代金券" clickable @click="sub_value.type = '3'">
          <van-radio slot="right-icon" name="3" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <p class="txsl_p">
      <span></span>数量
    </p>
    <van-field v-model="sub_value.count" placeholder="请输入数量" :error="error_1" />
    <p class="txsl_p">
      <span></span>接收人
    </p>
    <van-field v-model="sub_value.phone" placeholder="请输入接收人手机号" :error="error_2" />
    <p class="txsl_p">
      <span></span>二级密码
    </p>
    <!-- <van-field v-model="value1" placeholder="请输入二级密码" /> -->
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info="密码为 6 位数字"
      :error-info="error_info"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />

    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
    <div class="btn_div1" @click="f_submit">确定</div>
  </div>
</template>
<script>
export default {
  name: "zhuanchu",
  data() {
    return {
      error_1: false,
      error_2: false,
      error_info: "",
      value: "",
      showKeyboard: false,
      sub_value: {
        count: "", //			数量
        type: "1", //	//	类型：1流通 2消费 3代金
        phone: "", //	接收人电话
        password: "", //	2级密码
        source: 1
      }
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
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    f_submit() {
      this.sub_value.password = this.value;
      console.log(this.sub_value);

      if (this.sub_value.count == "") {
        this.error_1 = true;
      } else {
        this.error_1 = false;
        if (this.$common._verPhone(this.sub_value.phone)) {
          this.error_2 = false;
          if (this.sub_value.password == "") {
            this.error_info = "二级密码不能为空";
          } else {
            this.error_info = "";

            this.http.post("transfer", this.sub_value).then(res => {
              console.log(res.data);
              if (res.data.code == 200) {
                this.$toast.success("转出成功");
                this.$router.push({ name: "myAss" });
              }
            });
          }
        } else {
          this.error_2 = true;
        }
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
.txsl_p {
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 50px;
  span {
    display: inline-block;
    width: 5px;
    height: 13px;
    background: @bg_color;
    border-radius: 4px;
    margin-left: 15px;
  }
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
</style>