const BASEURL = 'https://www.easy-mock.com/mock/5d467ced41021f2f33874694/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'indexData',
  registerUser: LOCALURL + 'user/register', // 用户注册
  login: LOCALURL + 'user/login' // 用户登录
}

module.exports = URL
