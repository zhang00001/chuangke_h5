<template>
  <div class="content">
    <van-nav-bar title="兑换记录" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="流通券">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,i) in list" :key="i" style="padding:0">
            <van-cell style="vertical-align: middle;">
              <template slot="title" style="vertical-align: middle;">
                <h3 class="h31">USDT兑换</h3>
                <p class="p1">付款地址：{{item.fk_site}}</p>
                <p class="p1">{{item.create_time}}</p>
                <p class="p3">{{item.msg}}</p>
              </template>
              <template slot="default" style="vertical-align: middle;">
                <p class="p2" style="color:rgba(238,88,90,1);" v-if="item.status==-1">已驳回</p>
                <p class="p2" style="color:rgba(53,185,47,1);" v-if="item.status==1">已完成</p>
                <p class="p2" v-if="item.status==0">审核中</p>
                <h3 class="h32">
                  <!-- <span v-if="item.status==1">+</span>
                  <span v-else>-</span>-->
                  +{{item.lt_ticket}}
                </h3>
                <p>
                  <van-button
                    style="margin-top:15px"
                    plain
                    hairline
                    type="primary"
                    size="small"
                    @click="f_image(item.cz_img)"
                  >凭证</van-button>
                </p>
              </template>
            </van-cell>

            <!-- <van-cell style="vertical-align: middle;">
              <template slot="title" style="vertical-align: middle;">
                <h3 class="h31">USDT兑换</h3>
                <p class="p1">付款地址：4028403820480240048</p>
                <p class="p1">2019-09-26 19:00</p>
              </template>
              <template slot="default" style="vertical-align: middle;">
                <p class="p2">审核中</p>
                <h3 class="h32">+100</h3>
              </template>
            </van-cell>-->
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="消费券">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- <van-cell style="vertical-align: middle;" @click="f_Dialog(10)">
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
    <van-dialog v-model="show" style="padding:20px 0 0 0">
      <p class="v_a_p">兑换数量：{{count}}</p>
      <p class="v_a_p">兑换数量：2424</p>
    </van-dialog>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
export default {
  name: "record",
  data() {
    return {
      list_list: [
        {
          order_no: "cz370446811570787079", //	订单号
          user: null, //	用户名称
          phone: "13000000000", //		用户电话
          usdt: "11.00", //		usdt
          lt_ticket: "16.50", //	流通券
          fk_site: "1111111111111111", //			付款地址
          sk_site: "", //		收款地址
          cz_img: "", //	充值凭证
          msg: "111", //	审核意见
          img: "https://img.yzcdn.cn/vant/cat.jpeg", //	审核凭证
          status: 0, //	-1取消  0待审核  1完成
          create_time: "2019-10-11 17:44:39" //	申请时间
        }
      ],
      active: 0,
      show: false,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      total: "",
      count: 0
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
      .get("czLog", {
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
          .get("hotGoods", {
            page: this.page,
            size: 20
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
    f_Dialog(count) {
      this.count = count;
      this.show = true;

      return;
      this.$dialog
        .alert({
          message: "弹窗内容"
        })
        .then(() => {
          // on close
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
          this.http
            .get("czLog", {
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
        if (newVal == 1) {
          this.http
            .get("accLog", {
              page: this.page,
              size: 15,
              type: 1,
              acc_type: 3
            })
            .then(res => {
              console.log(res.data);
              if (res.data.code == 200) {
                this.total = res.data.data.total;
                this.list = res.data.data.data;
              }
            });
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
  width: 180px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  word-wrap: break-word;
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