<template>
  <div class="content">
    <van-nav-bar title="收货地址" left-arrow @click-left="$router.push({ name: 'my' })" />
    <div class="concat"></div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="f_click"
    />
    <!-- :disabled-list="disabledList"
    disabled-text="以下地址超出配送范围"-->
  </div>
</template>
<script>
export default {
  name: "address",
  data() {
    return {
      chosenAddressId: "",
      list: []
    };
  },
  mounted() {
    this.http.get("addressList", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        var list = res.data.data;
        // this.total_List = res.data.data;
        for (let i = 0; i < list.length; i++) {
          this.list.push({
            id: list[i].code,
            name: list[i].name,
            tel: list[i].phone,
            address: list[i].detail,
            areaCode: list[i].area_code,
            is_default: list[i].is_default
          });
          if (list[i].is_default == 1) {
            this.chosenAddressId = list[i].code;
          }
          if (this.$route.params.pay != 0) {
            this.chosenAddressId = "";
          }
        }
      }
    });
  },
  methods: {
    onAdd() {
      this.$router.push({
        name: "AddressAdd",
        params: { pay: this.$route.params.pay }
      });
    },

    onEdit(item, index) {
      this.$router.push({
        name: "AddressEdit",
        params: { pay: this.$route.params.pay, item: JSON.stringify(item) }
      });
    },
    f_click(item, index) {
      if (this.$route.params.pay != 0) {
        console.log(item);
        this.$router.push({
          name: "pay",
          params: { order: this.$route.params.pay, add: JSON.stringify(item) }
        });
      }
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