<template>
  <div class="content">
    <van-nav-bar title="联盟商家" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab :title="itemem" v-for="(itemem,i) in vantab" :key="i">
        <!-- <van-cell style="vertical-align: middle;">
          <template slot="title" style="vertical-align: middle;">
            <h3 class="h31">流通券兑换</h3>
            <p class="p1">消费券</p>
            <p class="p1">2019-09-26 19:00</p>
          </template>
          <template slot="default" style="vertical-align: middle;">
            <h3 class="h32">+100</h3>
          </template>
        </van-cell>-->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" style="padding:0">
            <van-image
              width="100%"
              height="110px"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <p>牛皮链条单肩斜挎女包女包女包牛皮链条</p>
            <span>55券</span>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "alliance_",
  data() {
    return {
      active: 0,
      vantab: ["日用品", "夜用品", "常用品", "家用品", "户外用品"],
      list: [],
      loading: false,
      finished: false
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
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
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
}
.h31 {
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.p1 {
  font-size: 14px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.p3 {
  font-size: 14px;
  font-weight: 500;
  color: rgba(238, 88, 90, 1);
}
.p2 {
  font-size: 15px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.h32 {
  font-size: 18px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.v_a_p {
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 30px;
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
/deep/.van-tabs__nav {
  .van-tab {
    background-color: @bg_color;
    font-size: 15px;
    color: rgba(255, 255, 255, 1);
  }
  .van-tabs__line {
    background-color: #fff;
    border-radius: 3px;
  }
}
/deep/.van-list {
  padding-bottom: 70px;
  .van-cell {
    display: inline-block;
    margin-left: 12px;
    background-color: #fff;
    height: 170px;
    width: 110px;
    border-radius: 6px;
    overflow: hidden;
    margin-top: 10px;
    line-height: 20px;
    p {
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 90%;
      margin-left: 5%;
      line-height: 30px;
    }
    span {
      font-size: 12px;
      display: inline-block;
      width: 90%;
      margin-left: 5%;
      color: rgba(255, 74, 74, 1);
    }
  }
}
</style>