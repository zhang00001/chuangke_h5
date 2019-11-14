<template>
  <div class="content">
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.go(-1)" />
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item v-for="(image, index) in data_list.banner" :key="index">
        <!-- <img :src="image" /> -->
        <van-image width="100%" height="100%" fit="contain" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="title">
      <p>{{data_list.name}}</p>
      <h3>
        <!-- <span>{{data_list.price}}</span> -->
        <span v-if="data_list.lm==0">消费券{{data_list.xf}}</span>
        <span v-if="data_list.lm==1">代金券{{data_list.dj}} +流通券{{data_list.lt}}</span>
      </h3>
      <div>
        <span>库存：{{data_list.stock}}</span>
        <span>月销：{{data_list.volume}}</span>
      </div>
      <div class="div_count">
        <span>购买数量</span>
        <span>
          <van-stepper v-model="value_count" :max="data_list.stock" @change="f_count" />
        </span>
      </div>
    </div>
    <div class="concat"></div>
    <p class="datail_p">详情</p>
    <van-image :src="image" v-for="(image, index) in data_list.details" :key="index" />
    <div class="sjop">
      <div>
        <van-grid :column-num="1" :border="false">
          <van-grid-item text="客服 " to="/kefu">
            <img
              src="../../assets/unie737.png"
              alt
              style="vertical-align: middle; width: 21px;height: 21px;"
              slot="icon"
            />
          </van-grid-item>
        </van-grid>
      </div>
      <p @click="f_zhuanchu">立即购买</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "details",
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      order_id: this.$route.params.order,
      data_list: "",
      value_count: 1
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
    this.$common.setCookie("count", 1);
    this.http
      .get("goodsDetails", {
        id: this.$route.params.order
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.data_list = res.data.data;
        }
      });
  },
  methods: {
    f_zhuanchu() {
      if (this.$common.getCookie("pay_password") == 1) {
        this.$router.push({
          name: "pay",
          params: { order: this.$route.params.order, add: 1 }
        });
      } else {
        this.$toast("您还未设置二级密码，请先在个人资料中设置二级密码");
      }
    },
    f_count(value) {
      this.$common.setCookie("count", value);
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  height: 100%;
  padding-bottom: 55px;
}
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
.swipe {
  width: 100%;
  height: 300px;
}
.title {
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
  margin-bottom: 10px;
  p {
    font-size: 18px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
  }
  h3 {
    color: rgba(255, 74, 74, 1);
    line-height: 30px;
  }
  div {
    font-size: 12px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .div_count {
    margin-top: 15px;
    color: #000;
    font-size: 14px;
  }
}
.sjop {
  background-color: #fff;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  div {
    display: inline-block;
    width: 183px;
    height: 100%;
    vertical-align: top;
  }
  p {
    vertical-align: top;
    display: inline-block;
    width: 187px;
    height: 100%;
    background-color: @bg_color;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    text-align: center;
  }
}
.datail_p {
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
/deep/.van-stepper__input {
  margin: 0 10px;
}
</style>
