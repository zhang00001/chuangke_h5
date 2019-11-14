<template>
  <div class="content">
    <van-nav-bar title="物流信息" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <div class="wuliu">
      <!-- <van-image
        width="100px"
        height="100px"
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        style="vertical-align: middle;"
      /> -->
      <div class="wl_div">
        <p>
          物流状态：
          <span>{{list.State==2?"在路上":list.State==3?"已签收":"问题件"}}</span>
        </p>
        <p>
          快递单号：
          <span>{{list.LogisticCode}}</span>
        </p>
        <p>
          快递公司：
          <span>{{list.ShipperCode}}</span>
        </p>
      </div>
    </div>
    <div class="concat"></div>
    <van-steps direction="vertical" :active="0">
      <van-step v-for="(item,i) in total_List" :key="i">
        <h3>{{item.AcceptStation}}</h3>
        <p>{{item.AcceptTime}}</p>
      </van-step>
      <!-- <van-step>
        <h3>【城市】物流状态2</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>快件已发货</h3>
      <p>2016-07-10 09:30</p>-->
      <!-- </van-step> -->
    </van-steps>
  </div>
</template>
<script>
export default {
  name: "expressage",
  data() {
    return {
      total_List: "",
      list: ""
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
      .get("logistics", {
        id: this.$route.params.order
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.total_List = res.data.data.Traces.reverse();
          this.list = res.data.data;
        }
      });
  }
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  height: 100%;
}
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
.wuliu {
  //   height: 140px;
  width: 90%;
  padding: 5%;
  .wl_div {
    display: inline-block;
    vertical-align: middle;
    p {
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      span {
        color: #878787;
      }
    }
  }
}
</style>
