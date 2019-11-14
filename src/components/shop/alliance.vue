<template>
  <div class="content">
    <van-nav-bar
      title="联盟商家"
      class="navbar"
      left-arrow
      @click-left="$router.push({ name: 'index'})"
    ></van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="(itemem,i) in vantab" :key="i" :title="itemem.nickname">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell
            v-for="(item,i) in list"
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
      </van-tab>
    </van-tabs>
    <img src="../../assets/128.png" class="tiaozhuan" alt @click="f_tiaozhua" />
  </div>
</template>
<script>
export default {
  name: "alliance",
  data() {
    return {
      active: 0,
      vantab: [],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      total: "",
      id: "",
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
  // updated() {
  //   window.scroll(0, 0);
  // },
  beforeRouteLeave(to, from, next) {
    this.scrollTop = document.querySelector(".content").scrollTop;
    //保存滚动条元素div的scrollTop值
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name == "index") {
        window.scrollTo(0, 0);
      } else {
        document.querySelector(".content").scrollTop = vm.scrollTop;
      }

      // 为div元素重新设置保存的scrollTop值
    });
  },
  mounted() {
    this.http.get("allianceMerchant", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.total_List = res.data.data;
      }
    });
    this.http.get("allianceMerchant", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.vantab = res.data.data;
        this.id = this.vantab[0].u_id;
        this.http
          .get("allianceMerchantGoods", {
            page: this.page,
            size: 20,
            id: this.id
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.list = res.data.data.data;
              this.total = res.data.data.total;
              console.log(this.total);
              console.log(this.list);
            }
          });
      }
    });
  },
  methods: {
    f_tiaozhua() {
      var list = this.total_List.filter(item => {
        return item.u_id == this.id;
      });
      var list_data = list[0];
      console.log(list_data);
      window.location =
        "http://api.map.baidu.com/marker?location=" +
        list_data.longitude +
        "," +
        list_data.latitude +
        "&title=" +
        list_data.address +
        "&content=" +
        list_data.nickname +
        "&output=html&src=webapp.baidu.openAPIdemo";
    },
    f_get(id) {
      this.http
        .get("allianceMerchantGoods", {
          page: 1,
          size: 20,
          id: id
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.list = res.data.data.data;
            this.total = res.data.data.total;
            console.log(this.total);
            console.log(this.list);
          }
        });
    },
    onLoad() {
      setTimeout(() => {
        console.log("------------");
        console.log(this.total);
        console.log(this.list.length);
        console.log("------------");
        this.page += 1;
        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.finished = true;
          this.loading = false;
          return;
        }
        this.http
          .get("allianceMerchantGoods", {
            page: this.page,
            size: 20,
            id: this.id
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.list = this.list.concat(res.data.data.data);
              console.log(this.list);
              // 加载状态结束
              this.loading = false;
            }
          });
      }, 500);
    }
  },
  watch: {
    active: {
      deep: true, //深度监听
      handler: function(newVal, oldVal) {
        console.log(newVal);
        this.page = 1;
        this.id = this.vantab[newVal].u_id;
        this.f_get(this.id);
        // this.onLoad();
        this.loading = false;
        this.finished = false;
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
.tiaozhuan {
  position: fixed;
  right: 15px;
  bottom: 20px;
  width: 40px;
  // height: 40px;
}
</style>