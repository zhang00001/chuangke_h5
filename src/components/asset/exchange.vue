<template>
  <div class="content">
    <van-nav-bar
      title="兑换中心"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="历史记录"
      @click-right="$router.push({ name: 'record' })"
    />
    <div class="concat"></div>
    <van-panel title="流通券兑换" style="padding-bottom: 20px;">
      <div>
        <p class="v_p_p">汇率</p>
        <h3 class="v_p_h3">100USDT={{100*huilv.v2}}流通券</h3>
        <div class="btn_div" @click="$router.push({ name: 'change_ltq' })">去兑换</div>
      </div>
    </van-panel>
    <div class="concat"></div>
    <van-panel title="消费券兑换" style="padding-bottom: 20px;">
      <div>
        <p class="v_p_p">汇率</p>
        <h3 class="v_p_h3">1消费券={{1*huilv.v}}流通券</h3>
        <van-field
          v-model="m_consume"
          label="消费券"
          type="number"
          placeholder="请输入兑换数量"
          :error="error_1"
        />
        <p class="v_p_p_2">
          流通券：{{m_consume*huilv.v}}
          <!-- <span v-if="m_consume>lt*1">数量不足</span> -->
        </p>
        <div class="btn_div" @click="f_Dialog">兑换</div>
      </div>
      <van-dialog
        v-model="show"
        style=" text-align: center;padding:20px 0 0 0"
        @confirm="f_tradeTicket"
        show-cancel-button
      >
        <p class="v_a_p">兑换消费券数量：{{m_consume}}</p>
        <p class="v_a_p">需要流通券：{{m_consume*huilv.v}}</p>
      </van-dialog>
    </van-panel>
    <div class="concat"></div>
    <!-- <van-panel title="复消积分兑换" style="padding-bottom: 20px;">
      <div>
        <p class="v_p_p">汇率</p>
        <h3 class="v_p_h3">1复消积分={{1*huilv.fx}}流通券</h3>
        <van-field
          v-model="m_fuxiao"
          label="复消积分"
          type="number"
          placeholder="请输入兑换数量"
          :error="error_2"
        />
        <p class="v_p_p_2">
          流通券：{{m_fuxiao*huilv.fx}}
      
        </p>
        <div class="btn_div" @click="f_Dialog2">兑换</div>
      </div>
      <van-dialog
        v-model="show2"
        style=" text-align: center;padding:20px 0 0 0"
        @confirm="f_tradeTicket22"
        show-cancel-button
      >
        <p class="v_a_p">兑换复消积分数量：{{m_fuxiao}}</p>
        <p class="v_a_p">需要流通券：{{m_fuxiao*huilv.fx}}</p>
      </van-dialog>
    </van-panel>-->
  </div>
</template>
<script>
export default {
  name: "exchange",
  data() {
    return {
      m_consume: "",
      m_fuxiao: "",
      error_1: false,
      huilv: "",
      show: false,
      show2: false,
      error_2: false
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
    this.http.get("getInterestRate", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.huilv = res.data.data;
      }
    });
  },
  methods: {
    f_Dialog() {
      if (this.m_consume == "") {
        this.error_1 = true;
      } else {
        this.show = true;
      }
    },
    f_Dialog2() {
      if (this.m_fuxiao == "") {
        this.error_2 = true;
      } else {
        this.show2 = true;
      }
    },
    f_tradeTicket() {
      // if (this.m_consume == "") {
      //   this.error_1 = true;
      // } else {
      this.http
        .post("tradeTicket", {
          count: this.m_consume,
          type: 1
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$toast.success("兑换成功");
            this.$router.push({ name: "myAss" });
          }
        });
      // }
    },
    f_tradeTicket22() {
      this.http
        .post("fxDhLt", {
          count: this.m_fuxiao
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$toast.success("兑换成功");
            this.$router.push({ name: "myAss" });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../style/baseColor.less);
.content {
  width: 100%;
  min-height: 100vh;
  background: #f4f4f4;
}
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
.btn_div {
  width: 355px;
  height: 44px;
  background: @bg_color;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
  text-align: center;
  margin-left: 15px;
  margin-top: 20px;
}
.v_p_p {
  font-size: 15px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  margin-left: 15px;
  line-height: 30px;
}
.v_p_h3 {
  font-size: 22px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin-left: 15px;
  line-height: 50px;
}
.v_p_p_2 {
  font-size: 15px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: 15px;
  line-height: 40px;
  span {
    color: rgba(255, 74, 74, 1);
  }
}
/deep/.van-nav-bar {
  .van-nav-bar__right {
    .van-nav-bar__text {
      color: rgba(153, 153, 153, 1);
    }
  }
}
.v_a_p {
  line-height: 40px;
}
</style>