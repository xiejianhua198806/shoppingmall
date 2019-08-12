<template>
  <div>
    <!-- 头部 -->
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <!-- 内容区域 -->
    <div>
      <van-row>
        <!-- 左侧边栏 -->
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index,item.ID)"
                :class="{categoryActice:categoryIndex==index}"
                v-for="(item , index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <!-- 右侧边栏 -->
        <van-col span="18">
          <!-- 横向滚动栏 -->
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <!-- 右侧上拉加载下拉刷新 -->
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div
                  class="list-item"
                  @click="goGoodsInfo(item.ID)"
                  v-for="(item,index) in goodList"
                  :key="index"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { toMoney } from "@/filter/filter.js";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0, // 用于显示的active
      categorySub: [], // //小类类别
      active: 0, //激活标签的值
      loading: false, //loading默认设置为false
      finished: false, // 是否加载完成
      page: 1, //商品列表的页数
      goodList: [], // 商品信息
      categorySubId: "", //商品子分类ID
      isRefresh: false, //下拉刷新
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"'
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height =
      winHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height =
      winHeight - 90 - 50 + "px";
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    //   获取默认数据
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryID(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 点击左侧列表 增加active
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.goodList = [];
      this.finished = false;
      this.getCategorySubByCategoryID(categoryId);
    },
    // 点击左侧列表获取id 渲染右侧数据
    getCategorySubByCategoryID(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
            this.categoryId = this.categorySub[0].ID;
            this.categorySubId = this.categorySub[0].ID;
            this.getGoodList();
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 上拉加载方法
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    // 点击子类获取商品信息
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      this.goodList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
    },

    // 获取小类数据中的列表数据
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: { categorySubId: this.categorySubId, page: this.page }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message.length) {
            this.page++; // 页码加1
            this.goodList = this.goodList.concat(response.data.message); // 在原来的基础上拼接数据
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = []; // 下拉刷新 清空list数据
        this.page = 1;
        this.onLoad(); //重新加载数据
      }, 500);
    },

    // 跳转到商品详细页
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    }
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActice {
  background-color: #fff;
}

.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>