<template>
  <div class="content">
    <van-nav-bar title="个人资料" left-arrow @click-left="$router.go(-1)" />
    <div class="concat"></div>
    <van-cell title="头像" style="vertical-align: middle;">
      <template slot="default" style="vertical-align: middle;">
        <!-- <van-image :src="total_List.image" alt round fit="cover" width="34px" height="34px" /> -->
        <span class="url_url_csl" v-if="total_List.image">
          <img :src="total_List.image" alt />
          <i class="el-icon-delete delete_i" @click="total_List.image=!total_List.image"></i>
        </span>
        <van-uploader
          v-if="!total_List.image"
          v-model="fileList"
          multiple
          :max-count="1"
          :after-read="afterRead"
          style="vertical-align: middle;"
        />
        <!-- <van-uploader v-model="fileList" multiple :max-count="1" /> -->
      </template>
    </van-cell>
    <!--  <van-cell title="昵称" :value="total_List.nickname" />
    <van-cell title="手机号" :value="total_List.phone" />
    <van-cell title="性别" :value="total_List.sex" />
    <van-cell title="年龄" :value="total_List.age" />-->
    <van-cell-group>
      <!-- <van-field v-model="total_List.nickname" label="头像" /> -->
      <van-field v-model="total_List.nickname" label="昵称" />
      <van-field v-model="phone" label="手机号" disabled />
      <van-field v-model="total_List.sex" label="性别" @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-field v-model="total_List.age" label="年龄" type="number" />
    </van-cell-group>
    <div class="concat"></div>
    <van-cell-group v-if="total_List.level==11">
      <van-field v-model="total_List.address" label="店铺地址" />
      <van-field v-model="total_List.longitude" label="经度" />
      <van-field v-model="total_List.latitude" label="纬度" />
    </van-cell-group>
    <div class="concat"></div>
    <van-cell
      title="修改密码"
      is-link
      @click="$router.push({ name: 'changepwd', params: { phone: total_List.phone }} )"
    />
    <van-cell
      title="二级密码"
      is-link
      @click="$router.push({ name: 'erjipwd', params: { phone: total_List.phone } })"
    />
    <div class="btn_div1" @click="f_login">确定修改</div>
  </div>
</template>
<script>
export default {
  name: "personal",
  data() {
    return {
      total_List: "",
      showPicker: false,
      columns: ["男", "女"],
      fileList: [],
      phone: "",
      image: "",
      address: "",
      jigndu: "",
      weidu: ""
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
    this.http.get("my", {}).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        this.total_List = res.data.data;
        this.phone = this.$common._phoneFour(this.total_List.phone);
        // this.fileList = [this.total_List.image];
        console.log(this.total_List.image);
      }
    });
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file.content);
      // console.log(file.file);
      let img = new Image();
      img.src = file.content;
      let that = this;
      img.onload = function() {
        that.ontpys(img);
      };

      // return;

      // var that = this;
      // var form = new FormData();
      // form.append("file", file.file);
      // this.http.post("upload", form).then(res => {
      //   console.log(res.data);
      //   this.total_List.image = res.data.data;
      // });
    },
    onConfirm(value) {
      this.total_List.sex = value;
      this.showPicker = false;
    },
    f_login() {
      // console.log(this.image);
      // console.log(this.total_List.image);
      // return
      this.http
        .post("saveInfo", {
          nickname: this.total_List.nickname, //	昵称
          image: this.image == "" ? this.total_List.image : this.image, //	头像
          sex: this.total_List.sex, //	性别
          age: this.total_List.age, //	年龄
          address: this.total_List.address,
          longitude: this.total_List.longitude,
          latitude: this.total_List.latitude
        })
        .then(res => {
          this.$toast.success("修改个人信息成功");
          this.$router.go(-1);
        });
    },
    // 压缩图片
    //压缩图片的方法
    ontpys(img) {
      let originWidth = img.width, // 压缩后的宽
        originHeight = img.height,
        maxWidth = 400,
        maxHeight = 400,
        quality = 0.8, // 压缩质量
        canvas = document.createElement("canvas"),
        drawer = canvas.getContext("2d");
      canvas.width = maxWidth;
      canvas.height = (originHeight / originWidth) * maxWidth;
      drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
      let base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
      let file = this.dataURLtoFile(base64, Date.parse(Date()) + ".jpg");
      file = { content: base64, file: file };
      console.log(file); //压缩后的file
      // this.onimg(file);
      var that = this;
      var form = new FormData();
      form.append("file", file.file);
      this.http.post("upload", form).then(res => {
        console.log(res.data);
        // this.total_List.image = res.data.data;
        that.image = res.data.data;
      });
    },
    //base64转file
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
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
.btn_div1 {
  width: 90%;
  margin-left: 5%;
  height: 44px;
  background: @bg_color;
  border-radius: 22px;
  text-align: center;
  line-height: 44px;
  font-weight: 500;
  font-size: 15px;
  color: rgba(255, 255, 255, 1);
  margin-top: 30px;
}
.bom_p {
  width: 84%;
  margin-left: 8%;
  height: 65px;
  line-height: 65px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  font-size: 15px;
  span {
    width: 49%;
    display: inline-block;
    height: 100%;
  }
}
.url_url_csl {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: relative;
  vertical-align: middle;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .delete_i {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 14px;
  }
}
/deep/.van-cell__title {
  line-height: 41px;
}
/deep/.van-cell__value {
  line-height: 41px;
}
</style>