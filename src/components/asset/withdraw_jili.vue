<template>
  <div class="content">
    <van-nav-bar title="提现记录" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <!-- <ul>
      <li v-for="(item,i) in list_list" :key="i">
        <p class="p1">
          <span>{{item.create_time}}</span>
          <span
            style="color:#FF4A4A"
            v-if="item.status==0"
          >{{item.status==0?"审核中":item.status==1?"已完成":item.status==-1?"取消":"超时"}}</span>
          <span v-else>{{item.status==0?"审核中":item.status==1?"已完成":item.status==-1?"取消":"超时"}}</span>
        </p>
        <p class="p2">
          <span>{{$common._level(item.level-1)}}</span>
          <span class="img">
            <img src="../../assets/jiantou copy.png" alt />
          </span>
          <span>{{$common._level(item.level)}}</span>
        </p>
        <p class="p3">
          <span>{{item.p_id.nickname}}</span>
          <span class="p3_p">手续费0.2%</span>
          <span>{{item.type==1?"推荐人":"领导人"}}</span>
        </p>
        <p class="p4">收款地址：123456786988765</p>
      </li>
    </ul>-->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,i) in list_list" :key="i">
        <p class="p1">
          <span>{{item.create_time}}</span>
          <span v-if="item.status==0">审核中</span>
          <span style="color:#35B92F" v-if="item.status==1">已完成</span>
          <span style="color:#FF4A4A" v-if="item.status==-1">驳回</span>
        </p>
        <p class="p2">
          <span>{{item.amount}}</span>
          <span class="img">
            <img src="../../assets/jiantou copy.png" alt />
          </span>
          <span>{{item.actual_amount}}</span>
        </p>
        <p class="p3">
          <span>流通券</span>
          <span class="p3_p">手续费{{item.poundage}}</span>
          <span>USDT</span>
        </p>
        <p class="p4">收款地址：{{item.address}}</p>
        <p class="p5" v-if="item.img">
          <van-button
            click="p5_btn"
            plain
            hairline
            type="primary"
            size="mini"
            @click="f_image(item.img)"
          >凭证</van-button>
        </p>
        <p style="color:#FF4A4A">{{item.msg}}</p>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
export default {
  name: "withdraw_jili",
  data() {
    return {
      list_list: [],
      finished: false,
      page: 1,
      loading: false,
      total: 0
    };
  },
  created() {
    if (!this.$common.getCookie("token")) {
      this.$common.setCookie("token", "", -7);
      this.$router.replace({
        path: "/login"
      });
    }
    // this.list_list = [
    //   {
    //     order_no: "tx210558111570701595", //		订单号
    //     amount: "1000.00", //		提现数量
    //     actual_amount: "900.00", //			实际到账
    //     poundage: "100.00", //		手续费
    //     name: "13000000009", //		提现人
    //     address: "ssiashiahsahsuaydsbdahgsua", //	钱包地址
    //     msg: null, //		审核消息
    //     img: null, //	审核凭证
    //     delivery_time: null, //		审核时间
    //     status: 1, //	-1取消  0审核中  1完成
    //     create_time: "2019-10-10 17:59:55" //		提现申请时间
    //   }
    // ];
  },
  mounted() {
    this.http
      .get("withdrawalLog", {
        page: this.page,
        size: 15
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.total = res.data.data.total;
          this.list_list = res.data.data.data;
          console.log(this.list_list);
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
        console.log(this.list_list.length);
        console.log("------------");
        this.page += 1;
        // 数据全部加载完成
        if (this.list_list.length >= this.total) {
          this.finished = true;
          this.loading = false;
          return;
        }
        this.http
          .get("withdrawalLog", {
            page: this.page,
            size: 15
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              // this.list_list.push(res.data.data.data);
              this.list_list = this.list_list.concat(res.data.data.data);
              console.log(this.list_list);
              // 加载状态结束
              this.loading = false;
            }
          });
      }, 500);
    }
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
// ul
/deep/.van-list {
  position: relative;
  // width: 90%;
  // margin-left: 5%;
  // li:last-of-type {
  //   border-bottom: 0;
  // }
  // li {
  //   border-bottom: 1px solid rgba(232, 232, 232, 1);
  p {
      display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
  }
  .p1 {
    font-size: 14px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    margin-top: 20px;
  }
  .p2 {
    font-size: 18px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
    position: relative;
    .img {
      //   display: inline-block;
      //   position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      font-size: 12px;
      font-weight: 500;
      color: rgba(99, 86, 255, 1);
      vertical-align: middle;
      img {
        vertical-align: middle;
      }
    }
  }
  .p3 {
    font-size: 12px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 10px;
    vertical-align: middle;
    position: relative;
    .p3_p {
      //   position: absolute;
      //   top: 0;
      //   right: 0;
      //   bottom: 0;
      //   left: 0;
      //   margin: auto;
    }
  }
  .p4 {
    font-size: 14px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }

  // }
}
</style>