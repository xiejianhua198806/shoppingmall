<template>
  <div>
    <div>
      <van-nav-bar title="会员中心" />
    </div>
    <div class="top">
      <img
        src="http://img4.duitang.com/uploads/item/201306/26/20130626090600_AE4Pn.thumb.700_0.jpeg"
        class="top-img"
      />
    </div>
    <div class="login">
      <div>
        <van-button type="warning" @click="login">我要登录</van-button>
      </div>
      <div>
        <van-button type="primary" @click="regest">我要注册</van-button>
      </div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" is-link />
        <van-cell title="我的订单" is-link />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    regest() {
      this.$router.push({ name: "Register" });
    }
  }
};
</script>

<style scoped>
.top-img {
  width: 70px;
  height: 70px;
  border-radius: 50px;
}
.top {
  height: 5rem;
  text-align: center;
  padding-top: 2rem;
  background-color: #eea2ad;
}
.login {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
}
.login div {
  flex: 1;
  text-align: center;
}
</style>