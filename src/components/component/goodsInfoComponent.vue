<template>
  <div>
    <div>
      <div class="goods-image">
        <img v-lazy="goodsImage" width="90%" />
      </div>
    </div>
    <div>{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice|moneyFilter}}</div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/filter.js";
export default {
  props: ["goodsImage", "goodsName", "goodsPrice", "goodsId"],
  data() {
    return {};
  },
  filters: {
    moneyFilter(val) {
      return toMoney(val);
    }
  }
};
</script>

<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>