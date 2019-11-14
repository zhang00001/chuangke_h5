<template>
  <div class="content">
    <van-nav-bar title="编辑地址" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-address-edit
      :area-list="areaList"
      :address-info="address"
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
export default {
  name: "AddressEdit",
  data() {
    return {
      areaList: this.$common.areaList(),
      address: {
        // addressDetail: "杭州市西湖区 黄龙万科中心",
        // areaCode: "320102",
        // city: "",
        // country: "",
        // county: "",
        // isDefault: true,
        // name: "asdfasd",
        // postalCode: "",
        // province: "",
        // tel: "13100000000"
      }
    };
  },
  mounted() {
    // console.log(JSON.parse(item).address);
    var item = JSON.parse(this.$route.params.item);
    console.log(item);
    var addressDetail = item.address.substr(item.address.indexOf("区") + 1);
    var areaCode = JSON.stringify(item.areaCode);

    this.address = {
      addressDetail: addressDetail,
      areaCode: areaCode,
      city: "",
      country: "",
      county: "",
      isDefault: item.is_default == 1 ? true : false,
      name: item.name,
      postalCode: "",
      province: item.name,
      tel: item.tel
    };
  },
  methods: {
    onSave(content) {
      console.log(content);
      var item = JSON.parse(this.$route.params.item);
      this.http
        .post("addressSave", {
          code: item.id, //	id编号（修改必填）
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
            this.$toast.success("编辑成功");
            this.$router.push({
              name: "address",
              params: { pay: this.$route.params.pay }
            });
          }
        });
    },
    onDelete() {
      var item = JSON.parse(this.$route.params.item);
      this.http
        .get("addressDel", {
          id: item.id
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$toast.success("删除成功");
            this.$router.push({
              name: "address",
              params: { pay: this.$route.params.pay }
            });
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
  height: 100%;
}
.concat {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
</style>