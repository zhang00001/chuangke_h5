<template>
  <div class="content">
    <van-nav-bar title="兑换记录" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- <van-cell style="vertical-align: middle;">
            <template slot="title" style="vertical-align: middle;">
              <h3 class="h31">流通券兑换</h3>
              <p class="p1">2019-09-26 19:00</p>
            </template>
            <template slot="default" style="vertical-align: middle;">
              <h3 class="h32">+100</h3>
            </template>
          </van-cell>-->
          <van-cell v-for="(item,i) in list" :key="i" style="padding:0">
            <van-cell style="vertical-align: middle;">
              <template slot="title" style="vertical-align: middle;">
                <h3 class="h31">{{item.text}}</h3>
                <p class="p1" v-if="item.acc_type==1">流通券</p>
                <p class="p1" v-if="item.acc_type==2">USDT</p>
                <p class="p1" v-if="item.acc_type==3">消费券</p>
                <p class="p1" v-if="item.acc_type==4">代金券</p>
                <p class="p1">{{item.create_time}}</p>
              </template>
              <template slot="default" style="vertical-align: middle;">
                <h3 class="h32">
                  <span v-if="item.status==1">+</span>
                  <span v-else>-</span>
                  {{item.count}}
                </h3>
              </template>
            </van-cell>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="流通券">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,i) in list" :key="i" style="padding:0">
            <van-cell style="vertical-align: middle;">
              <template slot="title" style="vertical-align: middle;">
                <h3 class="h31">{{item.text}}</h3>
                <p class="p1">流通券</p>
                <p class="p1">{{item.create_time}}</p>
              </template>
              <template slot="default" style="vertical-align: middle;">
                <h3 class="h32">
                  <span v-if="item.status==1">+</span>
                  <span v-else>-</span>
                  {{item.count}}
                </h3>
              </template>
            </van-cell>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="消费券">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,i) in list" :key="i" style="padding:0">
            <van-cell style="vertical-align: middle;">
              <template slot="title" style="vertical-align: middle;">
                <h3 class="h31">{{item.text}}</h3>
                <p class="p1">消费券</p>
                <p class="p1">{{item.create_time}}</p>
              </template>
              <template slot="default" style="vertical-align: middle;">
                <h3 class="h32">
                  <span v-if="item.status==1">+</span>
                  <span v-else>-</span>
                  {{item.count}}
                </h3>
              </template>
            </van-cell>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="代金券">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,i) in list" :key="i" style="padding:0">
            <van-cell style="vertical-align: middle;">
              <template slot="title" style="vertical-align: middle;">
                <h3 class="h31">{{item.text}}</h3>
                <p class="p1">代金券</p>
                <p class="p1">{{item.create_time}}</p>
              </template>
              <template slot="default" style="vertical-align: middle;">
                <h3 class="h32">
                  <span v-if="item.status==1">+</span>
                  <span v-else>-</span>
                  {{item.count}}
                </h3>
              </template>
            </van-cell>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
export default {
  name: "bill",
  data() {
    return {
      list_list: [
        {
          text: "流通券兑换消费钱", //				说明
          count: "1.00", //		数量
          img: "", //		凭证
          poundage: "0.00", //		手续费
          type: 1, //		1兑换 2转账 3自动 4奖励 5提现 6充值
          status: -1, //	1增加 -1减少
          create_time: "2019-10-10 13:46:27" //		创建时间
        }
      ],
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      total: "",
      acc_type: ""
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
    this.http
      .get("accLog", {
        page: this.page,
        size: 15
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.total = res.data.data.total;
          this.list = res.data.data.data;
        }
      });
  },
  methods: {
    f_image(item) {
      ImagePreview([item]);
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
          .get("accLog", {
            acc_type: this.acc_type,
            page: this.page,
            size: 15
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
    },
    f_get(acc_type) {
      this.http
        .get("accLog", {
          acc_type: acc_type,
          page: this.page,
          size: 15
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.total = res.data.data.total;
            this.list = res.data.data.data;
          }
        });
    }
  },
  watch: {
    active: {
      deep: true, //深度监听
      handler: function(newVal, oldVal) {
        this.page = 1;
        console.log(newVal);
        if (newVal == 0) {
          this.f_get();
          this.acc_type = "";
        }
        if (newVal == 1) {
          this.f_get(1);
          this.acc_type = 1;
        }
        if (newVal == 2) {
          this.f_get(3);
          this.acc_type = 3;
        }
        if (newVal == 3) {
          this.f_get(4);
          this.acc_type = 4;
        }
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
  // display: flex;
  // justify-content: space-between;
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
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
  .van-tabs__line {
    background-color: #fff;
    border-radius: 3px;
  }
}
</style>