<template>
  <div class="content">
    <van-nav-bar title="联系客服" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-cell :label="total_List.v" style="vertical-align: middle;">
      <template slot="title" style="vertical-align: middle;">
        <img
          src="../../assets/Group 2@3x (4).png"
          alt
          style="vertical-align: middle;width: 36px;height: 36px;"
        />
        <span class="custom-title" style="vertical-align: middle;">官方QQ</span>
      </template>
    </van-cell>
    <van-cell :label="total_List.v1" style="vertical-align: middle;">
      <template slot="title" style="vertical-align: middle;">
        <img
          src="../../assets/Group 4@3x.png"
          alt
          style="vertical-align: middle;width: 36px;height: 36px;"
        />
        <span class="custom-title" style="vertical-align: middle;">官方微信</span>
      </template>
    </van-cell>
    <van-cell :label="total_List.v2" style="vertical-align: middle;">
      <template slot="title" style="vertical-align: middle;">
        <img
          src="../../assets/Group 6@3x (2).png"
          alt
          style="vertical-align: middle;width: 36px;height: 36px;"
        />
        <span class="custom-title" style="vertical-align: middle;">人工客服</span>
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: "kefu",
  data() {
    return {
      total_List: ""
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
    this.http.get("getService", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.total_List = res.data.data;
      }
    });
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
/deep/.van-cell {
  .van-cell__title {
    img {
      margin-bottom: -20px;
    }
  }
  .van-cell__label {
    margin-left: 40px;
  }
}
</style>
