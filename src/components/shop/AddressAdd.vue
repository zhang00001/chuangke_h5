<template>
  <div class="content">
    <van-nav-bar title="新增地址" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>
<script>
export default {
  name: "AddressAdd",
  data() {
    return {
      areaList: this.$common.areaList(),
      searchResult: []
    };
  },

  methods: {
    onSave(content) {
      console.log(content);
      // addressDetail: "杭州市西湖区 黄龙万科中心"
      // areaCode: "110101"
      // city: "北京市"
      // country: ""
      // county: "东城区"
      // isDefault: true
      // name: "asdfasd"
      // postalCode: ""
      // province: "北京市"
      // tel: "13100000000"
      this.http
        .post("addressSave", {
          code: "", //	id编号（修改必填）
          name: content.name, //		收货人
          phone: content.tel, //	收货电话
          area_code: content.areaCode,
          detail:
            content.province +
            content.city +
            content.county +
            content.addressDetail, //		详情
          is_default: content.isDefault == true ? 1 : 0 //		默认 0否 1是
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$toast.success("新增成功");
            // this.$common.setCookie("token", res.data.data.token);
            this.$router.push({ name: "address" , params: { pay: this.$route.params.pay }});
          }
        });
    },
    onDelete() {
      this.$toast("delete");
    },
    onChangeDetail(val) {
      // if (val) {
      //   this.searchResult = [
      //     {
      //       name: "黄龙万科中心",
      //       address: "杭州市西湖区"
      //     }
      //   ];
      // } else {
      //   this.searchResult = [];
      // }
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
</style>