<template>
  <div class="content">
    <van-nav-bar title="订单详情" left-arrow @click-left="$router.go(-1)" />
    <div class="tishi" v-if="list.status==2">
      <img
        src="../../assets/daifahuo.png"
        alt
        style="vertical-align: middle;width: 21px;height: 21px;margin-right:5px"
      />您的订单正在打包中，准备发货
    </div>
    <div class="tishi" v-if="list.status==3">
      <img
        src="../../assets/fahuo-.png"
        alt
        style="vertical-align: middle;width: 21px;height: 21px;margin-right:5px"
      />您的订单已经在运送了
    </div>
    <div class="tishi" v-if="list.status==4">
      <img
        src="../../assets/Group 2 (5).png"
        alt
        style="vertical-align: middle;width: 21px;height: 21px;margin-right:5px"
      />订单已完成
    </div>
    <div class="concat"></div>
    <van-cell click="van_ce">
      <template slot="title">
        <img
          src="../../assets/Group (3).png"
          alt
          style="vertical-align: middle;width: 30px;height: 30px;"
        />
        <div class="custom-title" style="vertical-align: middle;display: inline-block;">
          {{list.user}}
          <span style="color:#878787;margin-left:10px">{{list.phone}}</span>
          <p>{{list.address}}</p>
        </div>
      </template>
    </van-cell>
    <div class="concat"></div>
    <div class="dat_div">
      <h3 class="_h3">
        {{list.s_name}}
        <!-- <van-icon name="arrow" style="vertical-align: middle;" /> -->
      </h3>
      <!-- <van-card
        num="1"
        price="600代金券+400流通券"
        title="牛皮链条单肩斜挎女包女包女包牛皮链条链条单肩斜挎女包"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      />-->
      <van-card
        :num="list.count"
        :desc="list.type==1?'消费券'+list.xf:'流通券'+list.lt+'+代金券'+list.dj"
        :title="list.name"
        :thumb="list.image"
        @click.stop="$router.push({ name: 'details' ,params: { order: list.goods_id }})"
      ></van-card>
      <div class="concat bottom"></div>
      <p class="p">
        <span class="p_span1">总数量</span>
        <span class="p_span2">{{list.count}}</span>
      </p>
      <p class="p">
        <span class="p_span1">快递费</span>
        <span class="p_span2">包邮</span>
      </p>
      <p class="p">
        <span class="p_span1">订单总价</span>
        <span class="p_span2">
          <!-- {{list.xf+'消费券+'+list.lt+'流通券+'+list.dj+'代金券'}} -->
          <span v-if="list.type==1">消费券{{list.xf}}</span>
          <span v-if="list.type==2">代金券{{list.dj}} +流通券{{list.lt}}</span>
        </span>
      </p>
    </div>
    <div class="concat"></div>
    <p class="p1">
      <span class="p_span1">订单号</span>
      <span class="p_span2">{{list.order_no}}</span>
    </p>
    <p class="p1">
      <span class="p_span1">创建时间</span>
      <span class="p_span2">{{list.create_time}}</span>
    </p>
    <p class="p1">
      <span class="p_span1">支付时间</span>
      <span class="p_span2">{{list.pay_time}}</span>
    </p>
    <!-- <p class="p1">
      <span class="p_span1">完成时间</span>
      <span class="p_span2">{{list.order_no}}</span>
    </p>-->
    <div class="concat"></div>
  </div>
</template>
<script>
export default {
  name: "order_det",
  data() {
    return {
      list: {
        // order_no: "zh734716111570777805", //			订单号
        // s_name: "222", //			商家名称
        // name: "火象百变锅", //			商品名称
        // xf: "0.00", //			消费券
        // lt: "1000.00", //		//			流通券
        // dj: "1000.00", //			代金券
        // count: 1, //		数量
        // image: "https://img.yzcdn.cn/vant/t-thirt.jpg", //			图片
        // user: "测试", //		收货人
        // phone: 333, //		收货电话
        // address: "XXXXXXX测试", //				收货地址
        // freight: "0.00", //			运费
        // note: "我是备注", //			备注
        // pay_status: 0, //		支付状态 0为支付 1支付
        // pay_time: "2019-10-11 15:10:05", //		支付时间
        // delivery_time: null, //				发货时间
        // courier: null, //			快递
        // courier_no: null, //			快递单号
        // arrive_time: null, //			收货时间
        // cancel: null, //			取消原因
        // status: 2, //		状态 0取消 1待支付 2待发货 3待收货 4完成
        // create_time: "2019-10-11 15:10:05" //		创建时间
      }
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
    this.http.get("orderDetails", { id: this.$route.params.id }).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.list = res.data.data;
      }
    });
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  // height: 100%;
  min-height: 100vh;
  background-color: rgba(244, 244, 244, 1);
}
.concat {
  width: 100%;
  height: 10px;
}
.bottom {
  border-bottom: 1px solid rgba(244, 244, 244, 1);
}
.dat_div {
  width: 90%;
  padding: 10px 5%;
  background-color: #fff;
  ._h3 {
    vertical-align: middle;
    font-size: 14px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
  }
  .p {
    font-size: 14px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    justify-content: space-between;
    .p_span2 {
      color: rgba(153, 153, 153, 1);
    }
  }
}
.p1 {
  width: 90%;
  padding: 10px 5%;
  background-color: #fff;
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  justify-content: space-between;
  .p_span2 {
    color: rgba(153, 153, 153, 1);
  }
}
.tishi {
  background-color: @bg_color;
  width: 100%;
  height: 35px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 35px;
  text-align: center;
  vertical-align: middle;
}
/deep/.van-cell__right-icon {
  line-height: 1.2rem;
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
