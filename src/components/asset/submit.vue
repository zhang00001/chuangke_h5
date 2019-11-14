<template>
  <div class="content">
    <van-nav-bar title="提交凭证" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-cell title="USDT数量" style="vertical-align: middle;">
      <template slot="label" style="vertical-align: middle;">
        <van-field v-model="m_usdt" placeholder="请输入USDT数量" type="number" :error="s_usdt" />
      </template>
    </van-cell>
    <van-cell title="付款地址" style="vertical-align: middle;">
      <template slot="label" style="vertical-align: middle;">
        <van-field v-model="m_address" placeholder="请输入付款的USDT钱包地址" :error="s_address" />
      </template>
    </van-cell>
    <van-cell title="支付凭证" style="vertical-align: middle;">
      <template slot="label" style="vertical-align: middle;">
        <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
      </template>
    </van-cell>
    <div class="btn_div1" @click="f_submit">确定</div>
  </div>
</template>
<script>
export default {
  name: "submit",
  data() {
    return {
      m_usdt: "",
      m_address: "",
      fileList: [],
      image: "",
      s_usdt: false,
      s_address: false
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
    afterRead(file) {
      console.log(file);

      var that = this;
      var form = new FormData();
      form.append("file", file.file);
      this.http.post("upload", form).then(res => {
        console.log(res.data);
        this.image = res.data.data;
      });
    },
    f_submit() {
      if (this.m_usdt == "") {
        this.s_usdt = true;
        return;
      }
      if (this.m_address == "") {
        this.s_address = true;
        return;
      }
      if (this.image == "") {
        this.$toast("请上传支付凭证");
        return;
      }
      this.s_usdt = false;
      this.s_address = false;
      this.http
        .post("tradeLtTicket", {
          count: this.m_usdt, //USDT数量
          f_address: this.m_address, //	付款地址
          address: this.$route.params.wallet, //	收款地址
          img: this.image //	支付凭证
        })
        .then(res => {
          this.$toast.success("充值成功，等待审核");
          this.$router.go(-1);
        });
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
/deep/.van-cell__title {
  line-height: 41px;
}
/deep/.van-cell__value {
  line-height: 41px;
}
</style>