<template>
  <div class="content">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.push({ name: 'my' })" />
    <!-- <ul> -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(item,i) in list"
        :key="i"
        @click="$router.push({ name: 'order_det' , params: { id: item.order_no }})"
      >
        <p class="li_p" style="position: relative;">
          <span>{{item.s_name}}</span>
          <span
            class="span2"
            style="color:rgba(99,86,255,1);  position: absolute;
        top: 0;
        right: 0;"
          >{{item.status==4?"已完成":item.status==3?"待收货":item.status==2?"待发货":item.status==1?"待支付":"取消"}}</span>
        </p>
        <van-card
          :desc="item.type==1?'消费券'+item.xf:'流通券'+item.lt+'+代金券'+item.dj"
          :num="item.count"
          :title="item.name"
          :thumb="item.image"
        ></van-card>
        <!--    title="萨芬打发士大夫撒旦法撒旦发生的发生颠覆发生大幅撒打发打发打发" -->
        <!--  @click.stop="$router.push({ name: 'details' ,params: { order: item.goods_id }})" -->
        <div class="ffoot" style="text-align: right;">
          <p class="footer_p">
            合计：
            <!-- :price="item.xf+'消费券+'+item.lt+'流通券+'+item.dj+'代金券'" {{item.xf+'消费券+'+item.lt+'流通券+'+item.dj+'代金券'}} -->
            <span v-if="item.type==1">消费券{{item.xf}}</span>
            <span v-if="item.type==2">代金券{{item.dj}} +流通券{{item.lt}}</span>
          </p>

          <div
            v-if="item.status==3"
            class="footer_div"
            @click.stop="$router.push({ name: 'expressage' , params: { order: item.order_no }})"
            style=" display: inline-block;
        width: 100px;
        height: 30px;
        background:#6356FF;
        border-radius: 19px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        "
          >查看物流</div>
          <!-- <div class="footer_div" style="background:rgba(199,199,199,1);">查看物流</div> -->
          <div
            v-if="item.status==3"
            class="footer_div"
            @click.stop="f_shouhuo(item.order_no)"
            style=" display: inline-block;
        width: 100px;
        height: 30px;
        background:#6356FF;
        border-radius: 19px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        "
          >确认收货</div>
          <!-- <div class="footer_div" style="background:rgba(199,199,199,1);">确认收货</div> -->
        </div>
      </van-cell>
      <!-- </ul> -->
    </van-list>
  </div>
</template>
<script>
export default {
  name: "myorder",
  data() {
    return {
      list_list: [
        {
          order_no: "zh734716111570777805", //	订单号
          s_name: "商家名称", //		商家名称
          name: "火象百变锅", //			//		商品名称
          xf: "0.00", //	消费券
          lt: "1000.00", //		流通券
          dj: "1000.00", //	代金券
          count: 1, //	数量
          image: "https://img.yzcdn.cn/vant/t-thirt.jpg", //	图片
          user: "测试", //	收货人
          phone: 333, //	收货电话
          address: "XXXXXXX测试", //		收货地址
          freight: "0.00", //	运费
          note: "我是备注", //	备注
          pay_status: 0, //		支付状态 0为支付 1支付
          pay_time: null, //	支付时间
          delivery_time: null, //		发货时间
          courier: null, //	快递
          courier_no: null, //		快递单号
          arrive_time: null, //		收货时间
          cancel: null, //	取消原因
          status: 3, //	状态 0取消 1待支付 2待发货 3待收货 4完成
          create_time: "2019-10-11 15:10:05" //		创建时间
        }
      ],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      total: ""
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
    this.http.get("orderList", { page: this.page, size: 10 }).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.list = res.data.data.data;
        this.total = res.data.data.total;
        console.log(this.total);
        console.log(this.list);
      }
    });
  },
  methods: {
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
          .get("orderList", {
            page: this.page,
            size: 10
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
    f_shouhuo(order) {
      this.$dialog
        .confirm({
          message: "确定收货吗？"
        })
        .then(() => {
          this.http
            .get("confirmReceipt", {
              id: order
            })
            .then(res => {
              console.log(res.data);
              if (res.data.code == 200) {
                this.$toast("确认收货成功");

                this.page = 1;
                this.http
                  .get("orderList", { page: this.page, size: 10 })
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
  //   height: 100%;
  min-height: 100vh;
  background-color: rgba(244, 244, 244, 1);
}
/deep/.van-list {
  /deep/.van-cell {
    background-color: #fff;
    margin-top: 10px;
    .li_p {
      // display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
      // display: -moz-box; /* 老版本语法: Firefox (buggy) */
      // display: -ms-flexbox; /* 混合版本语法: IE 10 */
      // display: -webkit-flex; /* 新版本语法: Chrome 21+ */
      // display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
      // -webkit-flex-wrap: nowrap;
      // -ms-flex-wrap: nowrap;
      // flex-wrap: nowrap;
      // justify-content: space-between;
      // width: 90%;
      // margin-left: 5%;
      line-height: 40px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      position: relative;
      .span2 {
        // float: right;
        // position: absolute;
        // top: 0;
        // right: 0;
      }
    }
    .ffoot {
      text-align: right;
      // width: 90%;
      // margin-left: 5%;
      padding-bottom: 10px;
      .footer_p {
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
      }
      .footer_div {
        display: inline-block;
        width: 100px;
        height: 30px;
        background: @bg_color;
        border-radius: 19px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
/deep/.van-card__desc {
  color: red;
}
/deep/.van-card__title {
  font-size: 16px;
  line-height: 25px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 50px;
}
</style>