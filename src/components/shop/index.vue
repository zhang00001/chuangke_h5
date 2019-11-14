<template>
  <div class="content">
    <van-nav-bar @click-left="$router.push({ name: 'share' })" @click-right="f_sao">
      <!-- $router.push({ name: 'scanQR' ,params: { phone: 13000000005  } }) -->
      <template slot="left">
        <img
          src="../../assets/shangchuan@3x.png"
          alt
          style="vertical-align: middle; width: 21px;height: 21px;"
        />
      </template>
      <template slot="title">
        <p>惠生活</p>
        <!-- <van-search
          placeholder="请输入搜索关键词"
          v-model="vansearch"
          shape="round"
          background="#6356FF"
          class="title"
          @search="onSearch"
          show-action
          @focus="m_seach=true"
        >
        <div slot="action" @click="onSearch" v-show="m_seach" style="color:#fff">搜索</div>-->
        <!-- </van-search> -->
      </template>
      <template slot="right">
        <img
          src="../../assets/saoyisao@3x.png"
          alt
          style="vertical-align: middle; width: 21px;height: 21px;"
        />
      </template>
    </van-nav-bar>
    <div class="bgc_div"></div>
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <a :href="images.href">
          <van-image width="100%" height="100%" fit="cover" :src="image.image" />
        </a>
      </van-swipe-item>
    </van-swipe>
    <div class="grid">
      <van-grid :column-num="3" :border="false">
        <!-- <van-grid-item v-for="value in 3" :key="value" icon="photo-o" text="文字"  /> -->
        <van-grid-item text="我的商家" to="/merchant">
          <img
            src="../../assets/Page 1@3x.png"
            alt
            style="vertical-align: middle; width: 21px;height: 21px;"
            slot="icon"
          />
        </van-grid-item>
        <van-grid-item text="联盟商家" to="/alliance">
          <img
            src="../../assets/Page 1@3x (1).png"
            alt
            style="vertical-align: middle; width: 21px;height: 21px;"
            slot="icon"
          />
        </van-grid-item>
        <van-grid-item text="兑换中心" to="/exchange">
          <img
            src="../../assets/Page 1@3x (2).png"
            alt
            style="vertical-align: middle; width: 21px;height: 21px;"
            slot="icon"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <div class="mian">
      <div class="mian_m"></div>
      <van-cell
        title="热门推荐"
        value="更多"
        is-link
        to="merchant"
        style=" background-color: rgba(244, 244, 244, 1);"
      />
      <div class="slide">
        <ul :style="{width:width}">
          <li
            v-for="(item,i) in hotGoods_list2"
            :key="i"
            @click="$router.push({ name: 'details' ,params: { order: item.goods_id }})"
          >
            <van-image width="100%" height="110px" fit="cover" :src="item.image" />
            <p>{{item.name}}</p>
            <!-- <span>￥{{item.price}}</span> -->
            <span>消费券{{item.xf}}</span>
            <!-- <span>+代金券{{item.dj}}</span>
            <span>+流通券{{item.lt}}</span>-->
          </li>
        </ul>
      </div>
      <van-cell
        title="猜你喜欢"
        value="更多"
        is-link
        to="alliance"
        style=" background-color: rgba(244, 244, 244, 1);"
      />
      <!-- <ul>
        <li v-for="value in 5" :key="value">
          <van-image
            width="100%"
            height="110px"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <p>牛皮链条单肩斜挎女包女包女包牛皮链条</p>
          <span>55券</span>
        </li>
      </ul>-->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell
          v-for="(item,i) in hotGoods_list"
          :key="i"
          style="padding:0"
          @click="$router.push({ name: 'details' ,params: { order: item.goods_id }})"
        >
          <van-image width="100%" height="110px" fit="cover" :src="item.image" />
          <p>{{item.name}}</p>
          <span>代金券{{item.dj}}</span>
          <span>+流通券{{item.lt}}</span>
        </van-cell>
      </van-list>
      <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
      </van-list>-->
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      vansearch: "",
      m_seach: false,
      images: [],
      list: [],
      loading: false,
      finished: false,
      hotGoods_list2: "",
      hotGoods_list: "",
      page: 1,
      total: "",
      width: ""
    };
  },

  // updated() {
  //   window.scroll(0, 0);
  // },
  created() {
    if (!this.$common.getCookie("token")) {
      this.$common.setCookie("token", "", -7);
      this.$router.replace({
        path: "/login"
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.scrollTop = document.querySelector(".content").scrollTop;
    //保存滚动条元素div的scrollTop值
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name != "details") {
        window.scrollTo(0, 0);
      }
      // if (from.name == "myorder") {
      //   console.log("myorder");
      //   this.$router.push({ name: "my" });
      // }
       else {
        document.querySelector(".content").scrollTop = vm.scrollTop;
      }
      // document.querySelector(".content").scrollTop = vm.scrollTop;
      // 为div元素重新设置保存的scrollTop值
    });
  },
  mounted() {
    this.http.get("getBanner", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.images = res.data.data;
      }
    });
    this.http
      .get("hotGoods", {
        page: 1,
        size: 20,
        type: 1 //热门推荐 2猜你喜欢
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.hotGoods_list2 = res.data.data.data;
          if (res.data.data.total >= 20) {
            this.width = "2450px";
          } else {
            this.width = 133 * res.data.data.total + "px";
          }
        }
      });
    this.http
      .get("hotGoods", {
        page: 1,
        size: 20,
        type: 2 //热门推荐 2猜你喜欢
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.hotGoods_list = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
  },
  methods: {
    f_sao() {
      // alert("11");
      window.android.callAndroidScan(this.$common.getCookie("token"));
    },
    onSearch() {
      alert("111");
    },
    onLoad() {
      setTimeout(() => {
        console.log("------------");
        console.log(this.total);
        console.log(this.hotGoods_list.length);
        console.log("------------");
        this.page += 1;
        // 数据全部加载完成
        if (this.hotGoods_list.length >= this.total) {
          this.finished = true;
          this.loading = false;
          return;
        }
        this.http
          .get("hotGoods", {
            page: this.page,
            size: 20,
            type: 2 //热门推荐 2猜你喜欢
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.hotGoods_list = this.hotGoods_list.concat(
                res.data.data.data
              );
              console.log(this.hotGoods_list);
              // 加载状态结束
              this.loading = false;
            }
          });
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  background-color: rgba(244, 244, 244, 1);
}
.title {
  margin-top: 5px;
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
    .van-nav-bar__text {
      color: rgba(255, 255, 255, 1);
    }
  }
}
.van-cell__title {
  color: @bg_color;
  font-weight: 600;
}
.bgc_div {
  background-color: @bg_color;
  width: 100%;
  height: 150px;
}
.swipe {
  width: 90%;
  margin-left: 5%;
  height: 150px;
  margin-top: -120px;
  border-radius: 10px;
}
.grid {
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 30px;
  margin-top: -30px;
}
.mian {
  background-color: rgba(244, 244, 244, 1);
  width: 100%;
  height: 100%;
  .mian_m {
    width: 90%;
    margin-left: 5%;
  }
  .slide {
    overflow-x: scroll;
    ul {
      // width: 2450px;
      height: 185px;
      overflow-x: scroll;
      padding: 0;

      li {
        display: inline-block;
        margin-left: 12px;
        background-color: #fff;
        height: 170px;
        width: 110px;
        border-radius: 6px;
        overflow: hidden;
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 90%;
          margin-left: 5%;
          line-height: 30px;
        }
        span {
          display: inline-block;
          width: 90%;
          margin-left: 5%;
          color: rgba(255, 74, 74, 1);
        }
      }
    }
  }
  ul {
    padding-bottom: 70px;
    li {
      display: inline-block;
      margin-left: 12px;
      background-color: #fff;
      height: 170px;
      width: 110px;
      border-radius: 6px;
      overflow: hidden;
      margin-top: 10px;
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 90%;
        margin-left: 5%;
        line-height: 30px;
      }
      span {
        display: inline-block;
        width: 90%;
        margin-left: 5%;
        color: rgba(255, 74, 74, 1);
      }
    }
  }
}
/deep/.van-list {
  padding-bottom: 70px;
  .van-cell {
    display: inline-block;
    margin-left: 12px;
    background-color: #fff;
    height: 190px;
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

/deep/.van-search {
  background: rgb(255, 255, 255, 0);
  background-color: @bg_color;
  padding: 0;
}
/deep/.van-nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.content {
  margin-top: 46px;
}
</style>