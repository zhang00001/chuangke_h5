<template>
  <div class="content">
    <div class="top_div">
      <img
        class="set_img"
        src="../assets/icon--11@3x.png"
        style="width:22px;height:22px"
        alt
        @click="$router.push({ name: 'setting' })"
      />
      <div class="div_tx">
        <!-- <van-image
          class="img"
          round
          fit="cover"
          width="50px"
          height="50px"
          :src="total_List.image"
          @click="$router.push({ name: 'personal' })"
        />-->
        <van-image
          v-if="total_List.image"
          class="img"
          round
          fit="cover"
          width="50px"
          height="50px"
          :src="total_List.image"
          @click="$router.push({ name: 'personal' })"
        />
        <van-image
          v-else
          class="img"
          round
          fit="cover"
          width="50px"
          height="50px"
          src="http://dcnc.qncdn.dapblock.com/d22e2edfb1e129e3400e08dadd9f0c35.jpg"
          @click="$router.push({ name: 'personal' })"
        />
        <p @click="$router.push({ name: 'personal' })">{{total_List.nickname}}</p>
        <van-icon name="arrow" class="icon" @click="$router.push({ name: 'personal' })" />
      </div>
    </div>
    <div class="main">
      <van-cell :value="level_name" is-link style="vertical-align: middle;" @click="f_huiyuan">
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../assets/Group@3x (2).png"
            alt
            style="vertical-align: middle; width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">会员</span>
        </template>
      </van-cell>
      <van-cell is-link style="vertical-align: middle;" @click="$router.push({ name: 'myAss' })">
        <!-- <van-cell is-link style="vertical-align: middle;"> -->
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../assets/Group 2@3x.png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">总资产</span>
        </template>
      </van-cell>
      <van-cell is-link style="vertical-align: middle;" @click="$router.push({ name: 'upgrade' })">
        <!-- <van-cell is-link style="vertical-align: middle;"> -->
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../assets/Group 3@3x (2).png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">升级确认</span>
        </template>
      </van-cell>
      <div class="concat"></div>
      <van-cell is-link style="vertical-align: middle;" @click="$router.push({ name: 'myorder'})">
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../assets/Group 5@3x.png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">我的订单</span>
        </template>
      </van-cell>
      <van-cell
        is-link
        style="vertical-align: middle;"
        @click="$router.push({ name: 'address', params: { pay: 0 }})"
      >
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../assets/Group 6@3x.png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">收货地址</span>
        </template>
      </van-cell>
      <div class="concat"></div>
      <van-cell is-link style="vertical-align: middle;" @click="$router.push({ name: 'share'})">
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../assets/Group 5@3x(2).png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">推荐分享</span>
        </template>
      </van-cell>
      <van-cell
        is-link
        style="vertical-align: middle;  margin-bottom:70px;"
        @click="$router.push({ name: 'kefu' })"
      >
        <template slot="title" style="vertical-align: middle;">
          <img
            src="../assets/Group 5@3x(1).png"
            alt
            style="vertical-align: middle;width: 30px;height: 30px;"
          />
          <span class="custom-title" style="vertical-align: middle;">联系客服</span>
        </template>
      </van-cell>
      <div class="concat"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "my",
  data() {
    return {
      total_List: "",
      level_name: ""
    };
  },
  created() {
    if (!this.$common.getCookie("token")) {
      this.$common.setCookie("token", "", -7);
      this.$router.replace({
        path: "/login"
      });
    }
    // if (this.$route.path === "/") {
    //   console.log("----/");
    //   this.$router.push({ name: "index" });
    // }
  },
  mounted() {
    this.http.get("my", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.total_List = res.data.data;
        console.log(this.$common._level(this.total_List.level));
        this.level_name = this.$common._level(this.total_List.level);
        this.$common.setCookie("level", this.total_List.level);
        this.$common.setCookie("phone", this.total_List.phone);
        this.$common.setCookie("pay_password", this.total_List.pay_password);
      }
    });
  },
  methods: {
    f_huiyuan() {
      if (this.total_List.level == 0) {
        this.$router.push({ name: "regmum" });
      } else {
        this.$router.push({ name: "member" });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../style/baseColor.less);
.content {
  width: 100%;
  // height: 100%;
  min-height: 100vh;
  background: #f4f4f4;
  margin-top: -46px;
}
#app {
  margin-top: 0;
  background: #f4f4f4;
}
.top_div {
  height: 150px;
  background-color: @bg_color;
  position: relative;
  .set_img {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .img {
    margin-left: 23px;
    margin-top: 60px;
    vertical-align: middle;
  }
  p {
    height: 60px;
    display: inline-block;
    font-size: 15px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
    margin-top: 60px;
    vertical-align: middle;
    margin-left: 5px;
  }
  .icon {
    color: #fff;
    font-size: 16px;
    position: absolute;
    top: 80px;
    right: 20px;
  }
}
// .top_div {
//   height: 150px;
//   background-color: @bg_color;
//   position: relative;
//   .div_tx {
//     // display: inline-block;
//     // position: absolute;
//     // left: 50;
//     // right: 0;
//     // top: 0;
//     // bottom: 0;
//     // margin: auto;
//     text-align: center;
//     // line-height: 150px;
//   }
//   .set_img {
//     position: absolute;
//     top: 20px;
//     right: 20px;
//   }
//   .img {
//     // margin-left: 23px;
//     margin-top: 30px;
//     vertical-align: middle;
//   }
//   p {
//     // height: 60px;
//     // display: inline-block;
//     font-size: 15px;
//     font-weight: 500;
//     color: rgba(255, 255, 255, 1);
//     line-height: 30px;
//     // margin-top: 75px;
//     vertical-align: middle;
//     // margin-left: 5px;
//   }
// }
.concat {
  width: 100%;
  height: 10px;
}
</style>