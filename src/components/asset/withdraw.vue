<template>
  <div class="content">
    <van-nav-bar
      title="提现"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="提现记录"
      @click-right="$router.push({ name: 'withdraw_jili' })"
    />
    <div class="concat"></div>
    <van-panel :title="'流通券余额：'+lt">
      <div>
        <van-cell title="收款地址" style="vertical-align: middle;">
          <template slot="label" style="vertical-align: middle;">
            <van-field v-model="m_address" placeholder="请输入USDT钱包地址进行收款" :error="error_1" />
          </template>
        </van-cell>
      </div>
    </van-panel>
    <div class="concat"></div>
    <p class="txsl_p">
      <span></span>提现数量
    </p>
    <van-radio-group v-model="radio" checked-color="#6356FF" style="margin-left:5%">
      <van-radio
        v-for="(item,i) in data_list"
        :key="i"
        :name="item.v"
        @click="f_radio(item.v1)"
      >{{item.v}}</van-radio>
      <!-- <van-radio name="1000">1000</van-radio>
      <van-radio name="2000">2000</van-radio>
      <van-radio name="5000">5000</van-radio>
      <van-radio name="10000">10000</van-radio>
      <van-radio name="20000">20000</van-radio>
      <van-radio name="50000">50000</van-radio>-->
    </van-radio-group>
    <p class="sxf_p">手续费{{sxf}}%</p>
    <p class="txsl_p">
      <span></span>二级密码
    </p>
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
    <div class="btn_div1" @click="f_submit">提交</div>
  </div>
</template>
<script>
export default {
  name: "withdraw",
  data() {
    return {
      lt: "",
      m_address: "",
      error_info: "",
      radio: "",
      data_list: "",
      sxf: "",
      showKeyboard: false,
      error_1: false,
      value: ""
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
        this.lt = res.data.data.lt;
      }
    });
    this.http.get("txConfig", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.data_list = res.data.data;
      }
    });
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    f_submit() {
      if (this.m_address == "") {
        this.error_1 = true;
      } else {
        this.error_1 = false;
        if (this.radio == "") {
          this.$toast("请选择提现数量");
        } else {
          let radio = this.radio;
          let m_address = this.m_address;
          let value = this.value;

          this.$dialog
            .confirm({
              title: "提现",
              message: "是否提现" + this.radio + "流通券到地址" + this.m_address
            })
            .then(e => {
              this.http
                .post("withdrawal", {
                  count: radio, //		数量
                  address: m_address, //	收款地址
                  password: value
                })
                .then(res => {
                  if (res.data.code == 200) {
                    this.$toast.success("提现成功");
                    this.$router.push({ name: "myAss" });
                  } else {
                    this.$dialog.error_info({
                      message: res.data.msg
                    });
                  }
                });
            })
            .catch(() => {
              // on cancel
            });
        }
      }
    },
    f_radio(item) {
      console.log(item);
      this.sxf = item;
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
.sxf_p {
  font-size: 15px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  margin-left: 15px;
  line-height: 50px;
}
/deep/.van-cell__title {
  line-height: 41px;
}
/deep/.van-cell__value {
  line-height: 41px;
}
/deep/.van-nav-bar {
  .van-nav-bar__right {
    .van-nav-bar__text {
      color: rgba(51, 51, 51, 1);
    }
  }
}
/deep/.van-radio {
  display: inline-block;
  width: 30%;
  border: 1px dashed #dddddd;
  text-align: center;
  line-height: 50px;
  margin-top: 10px;
  margin-left: 1%;
  .van-radio__icon {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>