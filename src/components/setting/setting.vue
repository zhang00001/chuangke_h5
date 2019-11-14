<template>
  <div class="content">
    <van-nav-bar title="设置" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-cell is-link style="vertical-align: middle;" @click="$router.push({ name: 'opinion' })">
      <template slot="title" style="vertical-align: middle;">
        <img
          src="../../assets/yijianfankui-@3x.png"
          alt
          style="vertical-align: middle; width: 21px;height: 21px;"
        />
        <span class="custom-title" style="vertical-align: middle;">意见反馈</span>
      </template>
    </van-cell>
    <van-cell is-link :value="m_value" style="vertical-align: middle;" @click="f_clear">
      <template slot="title" style="vertical-align: middle;">
        <img
          src="../../assets/qinglihuancun@3x.png"
          alt
          style="vertical-align: middle; width: 21px;height: 21px;"
        />
        <span class="custom-title" style="vertical-align: middle;">清理缓存</span>
      </template>
    </van-cell>
    <van-cell is-link value="V1.0" style="vertical-align: middle;">
      <template slot="title" style="vertical-align: middle;">
        <img
          src="../../assets/ziyuan@3x.png"
          alt
          style="vertical-align: middle; width: 21px;height: 21px;"
        />
        <span class="custom-title" style="vertical-align: middle;">当前版本</span>
      </template>
    </van-cell>
    <div class="btn_div" @click="f_logout">退出登录</div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  name: "setting",
  data() {
    return {
      m_value: "2.18MB"
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
    f_clear() {
      Dialog.confirm({
        message: "确定要清除本地缓存吗？"
      })
        .then(() => {
          // on confirm
          this.m_value = "0MB";
          this.$toast.success("清除缓存成功");
        })
        .catch(() => {
          // on cancel
        });
    },
    f_logout() {
      Dialog.confirm({
        message: "确定要退出登录吗？"
      })
        .then(() => {
          this.http.get("logOut", {}).then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.$common.setCookie("token", "", -7);
              this.$router.replace({
                path: "/login"
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
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
  width: 345px;
  height: 38px;
  background: rgba(153, 153, 153, 1);
  border-radius: 20px;
  margin-left: 15px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 38px;
  text-align: center;
  margin-top: 380px;
}
</style>