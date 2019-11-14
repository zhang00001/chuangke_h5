<template>
  <div class="content">
    <van-nav-bar title="升级确认" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <ul>
      <li v-for="(item,i) in li_List" :key="i">
        <div class="left_div">
          <van-image
            class="img"
            round
            fit="cover"
            width="26px"
            height="26px"
            :src="item.u_id.image"
          />
        </div>
        <div class="dight_div">
          <div>
            <span class="name">{{item.u_id.nickname}}</span>
            <span class="ltq">{{item.price}}流通券</span>
          </div>
          <div>
            <p>
              <span v-if="item.type==1">推荐人</span>
              <span v-if="item.type==2">领导人</span>
              <span>{{item.create_time}}</span>
            </p>
            <p class="btn" v-if="item.status==0" @click="f_submit(item.order_no)">确认</p>
            <p class="qer" v-if="item.status==1">已确认</p>
            <p class="qer" v-if="item.status==-1">取消</p>
          </div>
        </div>
      </li>
    </ul>
    <p style=" text-align: center;line-height: 50px;font-size: 14px;color: #969799;">没有更多了</p>
  </div>
</template>
<script>
export default {
  name: "upgrade",
  data() {
    return {
      li_List: [
        // {
        //   order_no: "sj642934111570695593", //	订单号
        //   u_id: {
        //     u_id: 11, //	升级人id
        //     nickname: "13000000009", //		升级人名称
        //     phone: 13000000009, //	升级人电话
        //     image: null, //	升级人头像
        //     spread_code: "66OMBC"
        //   },
        //   name: "升级vip会员", //		备注
        //   price: "1000",
        //   level: 1, //	升级等级
        //   p_time: null,
        //   type: 1, //			确认人身份：1推荐人确认 2领导人
        //   status: 0, //	确认状态：-2超时 -1取消 0未审核 1确认
        //   create_time: "2019-10-10 16:19:53" //	申请时间
        // }
      ]
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
    this.http.get("upgradeConfirmOrder", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.li_List = res.data.data;
      }
    });
  },
  methods: {
    f_submit(order) {
      this.$dialog
        .confirm({
          title: "",
          message: "是否确认升级"
        })
        .then(() => {
          this.http
            .get("upgradeConfirm", { id: order, status: 1 })
            .then(res => {
              console.log(res.data);
              if (res.data.code == 200) {
                this.$toast.success("确认成功");
                this.$router.push({ name: "my" });
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
  height: 100%;
}
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
ul {
  width: 345px;
  margin-left: 15px;
  // li:last-of-type {
  //   border: 0;
  // }
  li {
    padding: 20px 0;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
    .left_div {
      display: inline-block;
      width: 30px;
      height: 100%;
      vertical-align: top;
    }
    .dight_div {
      display: inline-block;
      vertical-align: top;
      width: 310px;
      div {
        display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box; /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox; /* 混合版本语法: IE 10 */
        display: -webkit-flex; /* 新版本语法: Chrome 21+ */
        display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
        -webkit-flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        justify-content: space-between;
        .name {
          font-size: 15px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
        }
        .ltq {
          font-size: 15px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
        }
        p {
          font-size: 12px;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
          span {
            display: block;
          }
        }
        .btn {
          text-align: center;
          width: 100px;
          height: 30px;
          background: rgba(99, 86, 255, 1);
          border-radius: 19px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 30px;
        }
        .qer {
          font-size: 14px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 38px;
        }
      }
    }
  }
}
</style>