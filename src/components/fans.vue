<template>
  <div class="content">
    <van-nav-bar title="我的粉丝" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-cell
      v-for="(item,i) in list_list"
      :key="i"
      :value="$common._level(item.level)"
      :label="item.create_time"
      style="vertical-align: middle;"
    >
      <template slot="title" style="vertical-align: middle;">
        <!-- <img :src="item.image" alt style="vertical-align: middle;width: 26px;height: 26px;" /> -->
        <van-image round width="26px" height="26px" :src="item.image"  style="vertical-align: middle;"/>
        <span class="custom-title" style="vertical-align: middle;">{{item.nickname}}</span>
      </template>
    </van-cell>
    <!-- <van-cell :value="$common._level(2)" label="2019-09-26 19:00" style="vertical-align: middle;">
      <template slot="title" style="vertical-align: middle;">
        <img
          src="../assets/Group 5(1).png"
          alt
          style="vertical-align: middle;width: 26px;height: 26px;"
        />
        <span class="custom-title" style="vertical-align: middle;">新用户12138</span>
      </template>
    </van-cell>-->
  </div>
</template>
<script>
export default {
  name: "fans",
  data() {
    return {
      list_list: ""
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
    this.http.get("fans", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.list_list = res.data.data;
      }
    });
  }
};
</script>
<style lang="less" scoped>
@import url(../style/baseColor.less);
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
  .van-cell__value {
    line-height: 47px;
    font-size: 15px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
  .van-cell__title {
    .van-cell__label {
      margin-left: 30px;
    }
  }
}
</style>
