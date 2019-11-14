<template>
  <div class="content">
    <van-nav-bar title="意见反馈" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-cell-group>
      <van-field
        v-model="message"
        type="textarea"
        placeholder="您的建议对我们至关重要…"
        rows="5"
        autosize
        :error="error"
      />
    </van-cell-group>
    <div class="btn_div" @click="f_submit">确定</div>
  </div>
</template>
<script>
export default {
  name: "opinion",
  data() {
    return {
      message: "",
      error: false
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
    f_submit() {
      if (this.message) {
        this.http
          .post("feedback", {
            message: this.message
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.$toast.success("意见反馈成功");
              this.$router.go(-1);
            }
          });
      } else {
        this.error = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  min-height: 100vh;
  background: #f4f4f4;
}
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
.btn_div {
  width: 355px;
  height: 44px;
  background: @bg_color;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
  text-align: center;
  margin-left: 15px;
  margin-top: 50px;
}
</style>