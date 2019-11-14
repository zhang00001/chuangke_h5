<template>
  <div class="content">
    <van-nav-bar
      title="会员"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push({ name: 'share' })"
    >
      <img src="../../assets/shangchuan@3x.png" slot="right" alt  style="width:20px;height:20px"/>
    </van-nav-bar>
    <div class="top_div">
      <div class="h3">{{$common._level($common.getCookie("level"))}}</div>
      <div class="div">
        <span @click="$router.push({ name: 'fans' })">我的粉丝</span>
        <!-- <img src="../../assets/jiantou.png" alt /> -->
        <!-- <span v-if="$common.getCookie('level')>=11">已经是最高等级</span> -->
        <span v-if="$common.getCookie('level')<9">
          <span
            v-if="$common.getCookie('level')>=2&&$common.getCookie('level')<=8"
          >下一级：{{$common._level($common.getCookie("level")*1+2)}}</span>
          <span v-else>下一级：{{$common._level($common.getCookie("level")*1+1)}}</span>
        </span>
      </div>
    </div>
    <div class="table_div">
      <table>
        <tr style="font-size:15px;font-weight:600;color:rgba(51,51,51,1);">
          <td>类型</td>
          <td>条件</td>
          <td>当前</td>
          <td>完成</td>
        </tr>
        <tr>
          <td>团队人数</td>
          <td>{{table_List.td_tj}}</td>
          <td>{{table_List.td_num}}</td>
          <td>
            <img src="../../assets/icon_wrong.png" alt v-if="table_List.td==0" />
            <img src="../../assets/chenggong.png" alt v-else />
          </td>
        </tr>
        <tr>
          <td>直推人数</td>
          <td>{{table_List.zt_tj}}</td>
          <td>{{table_List.zt_num}}</td>
          <td>
            <img src="../../assets/icon_wrong.png" alt v-if="table_List.zt==0" />
            <img src="../../assets/chenggong.png" alt v-else />
          </td>
        </tr>
        <tr>
          <td>平级人数</td>
          <td>{{table_List.pj_tj}}</td>
          <td>{{table_List.pj_num}}</td>
          <td>
            <img src="../../assets/icon_wrong.png" alt v-if="table_List.pj==0" />
            <img src="../../assets/chenggong.png" alt v-else />
          </td>
        </tr>
      </table>
    </div>
    <div class="list_div">
      <ul>
        <li v-for="(item,i) in list_list" :key="i">
          <p class="p1">
            <span>{{item.create_time}}</span>
            <span
              style="color:#FF4A4A"
              v-if="item.status==0"
            >{{item.status==0?"待审核":item.status==1?"已确认":item.status==-1?"取消":"超时"}}</span>
            <span v-else>{{item.status==0?"待审核":item.status==1?"已确认":item.status==-1?"取消":"超时"}}</span>
          </p>
          <p class="p2">
            <span>{{$common._level(item.level-1)}}</span>
            <span class="img">
              升级
              <img src="../../assets/jiantou copy.png" alt />
            </span>
            <span>{{$common._level(item.level)}}</span>
          </p>
          <p class="p3">
            <span>
              <van-image class="img_image" round fit="cover" :src="item.p_id.image" />
              {{item.p_id.nickname}}
            </span>
            <span>{{item.type==1?"推荐人":"领导人"}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "member",
  data() {
    return {
      list_list: "",
      table_List: ""
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
    // console.log(this.$common.getCookie("level")*1 + 1)
    // console.log(this.$common._level(this.$common.getCookie("level") + 1));
    this.http.get("upgCon", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.table_List = res.data.data;
      }
    });
    this.http.get("upgradeLog", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        // this.list_list = [
        //   {
        //     order_no: "sj041aekr14215610350", //		升级id
        //     name: "升级7星会员", //		名称
        //     level: 8, //	升级的对应等级
        //     p_id: {
        //       u_id: 2, //	确认人id
        //       nickname: "测试管理员4444", //		确认人名称
        //       phone: 13000000001, //		确认人电话
        //       image: "https://img.yzcdn.cn/vant/cat.jpeg", //	确认人头像
        //       spread_code: null
        //     }, //
        //     p_time: 1561035982, //推荐人审核时间
        //     type: 1, //		1推荐人确认 2领导人
        //     status: 0, //	-2超时 -1取消 0未审核 1确认
        //     create_time: "2019-06-20 20:50:49"
        //   }
        // ];
        this.list_list = res.data.data;
      }
    });
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
.top_div {
  background-color: @bg_color;
  height: 200px;
  text-align: center;
  overflow: hidden;
  .h3 {
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    margin-top: 20px;
  }
  .div {
    width: 80%;
    margin-left: 10%;
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
    span {
      color: rgba(255, 255, 255, 1);
      font-size: 15px;
      font-weight: 500;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
.table_div {
  width: 345px;
  height: 151px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-left: 15px;
  table {
    margin-top: -100px;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
}
.list_div {
  width: 345px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-left: 15px;
  margin-top: 10px;
  overflow: hidden;
  ul {
    width: 90%;
    margin-left: 5%;
    li:last-of-type {
      border-bottom: 0;
    }
    li {
      border-bottom: 1px solid rgba(232, 232, 232, 1);
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
        .img_image {
          width: 22px;
          height: 22px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
  }
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
</style>