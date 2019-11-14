<template>
  <div class="content">
    <van-nav-bar title="订单详情" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-cell
      is-link
      style="vertical-align: middle;"
      click="van_ce"
      @click="$router.push({ name: 'address', params: { pay: $route.params.order } })"
      v-if="$route.params.add==1"
    >
      <template slot="title" style="vertical-align: middle;">
        <img
          src="../../assets/Group 2@3x (5).png"
          alt
          style="vertical-align: middle;width: 25px;height: 25px;"
        />
        <span class="custom-title" style="vertical-align: middle;margin-left:10px">添加收货地址</span>
      </template>
    </van-cell>
    <van-cell
      is-link
      click="van_ce"
      v-else
      @click="$router.push({ name: 'address', params: { pay: $route.params.order } })"
    >
      <template slot="title">
        <img
          src="../../assets/Group (3).png"
          alt
          style="vertical-align: middle;width: 30px;height: 30px;"
        />
        <div class="custom-title" style="vertical-align: middle;display: inline-block;">
          {{JSON.parse($route.params.add).name}}
          <span
            style="color:#878787;margin-left:10px"
          >{{JSON.parse($route.params.add).tel}}</span>
          <p>{{JSON.parse($route.params.add).address}}</p>
        </div>
      </template>
    </van-cell>
    <div class="concat"></div>
    <div class="dat_div">
      <h3 class="_h3">
        {{data_list.u_id.nickname}}
        <van-icon name="arrow" style="vertical-align: middle;" />
      </h3>
      <van-card
        :num="$common.getCookie('count')"
        :desc="price"
        :title="data_list.name"
        :thumb="data_list.image"
      />
      <!-- <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      />-->
      <div class="concat bottom"></div>
      <p class="p">
        <span class="p_span1">总数量</span>
        <span class="p_span2">{{$common.getCookie("count")}}</span>
      </p>
      <p class="p">
        <span class="p_span1">快递费</span>
        <span class="p_span2">包邮</span>
      </p>
      <p class="p">
        <span class="p_span1">订单总价</span>
        <!-- <span
          class="p_span2"
        >{{data_list.price+data_list.xf+'消费券'+data_list.dj+'代金券'+data_list.lt+'流通券'}}</span>-->
        <span class="p_span2" v-if="data_list.lm==0">消费券{{data_list.xf*$common.getCookie("count")}}</span>
        <span class="p_span2" v-if="data_list.lm==1">代金券{{data_list.dj}} +流通券{{data_list.lt}}</span>
      </p>
    </div>
    <van-submit-bar button-text="确认支付" @submit="onSubmit" :loading="loading">
      <p slot="default" style="margin-right:5px">
        合计：
        <!-- <span
          style="color:#FF4A4A"
        >{{data_list.price+data_list.xf+'消费券'+data_list.dj+'代金券'+data_list.lt+'流通券'}}</span>-->
        <span
          style="color:#FF4A4A"
          v-if="data_list.lm==0"
        >消费券{{data_list.xf*$common.getCookie("count")}}</span>
        <span style="color:#FF4A4A" v-if="data_list.lm==1">代金券{{data_list.dj}} +流通券{{data_list.lt}}</span>
      </p>
    </van-submit-bar>
    <van-popup v-model="show" round position="bottom" closeable :style="{ height: '380px' }">
      <p class="popup_p">输入密码</p>
      <van-password-input
        :value="value"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
        style="margin-top:10px"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "pay",
  data() {
    return {
      value: "",
      showKeyboard: true,
      show: false,
      loading: false,
      data_list: "",
      price: ""
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
      .get("goodsDetails", {
        id: this.$route.params.order
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.data_list = res.data.data;
          if (this.data_list.lm == 0) {
            this.price = "消费券" + this.data_list.xf;
          }
          if (this.data_list.lm == 1) {
            this.price =
              "代金券" + this.data_list.dj + "+流通券" + this.data_list.lt;
          }
        }
      });
  },
  methods: {
    onSubmit() {
      if (this.$route.params.add == 1) {
        this.$toast("收货地址不能为空");
      } else {
        this.show = true;
        this.showKeyboard = true;
        this.value = "";
      }
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.show = false;
        this.loading = true;

        this.http
          .post("placeOrder", {
            count: this.$common.getCookie("count"), //	数量
            address_id: JSON.parse(this.$route.params.add).id, //	//	收货地址
            goods_id: this.$route.params.order, //	商品id
            note: "", //	备注
            password: this.value //	二级密码
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.$common.setCookie("count", 1);
              this.$toast.success("下单成功");
              this.$router.push({ name: "myorder" });
            } else {
              this.loading = false;
            }
          });
        // setTimeout(() => {
        //   // this.loading = false;
        //   this.$toast.success("支付成功");
        //   this.$router.push({ name: "myorder" });
        // }, 2000);
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
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
  margin-bottom: 60px;
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
.popup_p {
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  border-bottom: 1px solid rgba(244, 244, 244, 1);
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
