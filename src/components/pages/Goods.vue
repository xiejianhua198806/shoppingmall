<template>
  <div>
    <!-- 导航 -->
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <!-- 图片 -->
    <div class="topimage-div">
      <img v-lazy="goodsInfo.IMAGE1" width="100%" />
    </div>
    <!-- 描述和价格 -->
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <!-- tab切换 -->
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">
          <div>评论制作中</div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 立即购买和加入购物车 -->
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/filter.js";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getInfo();
  },
  methods: {
    //   获取详情
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: { goodsId: this.goodsId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.detail {
  font-size: 0px;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}

.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>