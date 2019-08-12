const BASEURL = 'https://www.easy-mock.com/mock/5d467ced41021f2f33874694/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'indexData',
  registerUser: LOCALURL + 'user/register', // 用户注册
  login: LOCALURL + 'user/login', // 用户登录
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', // 获取商品详情
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 获取大类商品信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 获取小类商品信息
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID' // 获取小类商品id

}

module.exports = URL
