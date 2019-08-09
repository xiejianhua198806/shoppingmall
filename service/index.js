const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {
  connect,
  initSchemas
} = require('./database/init.js')
// koa专有post请求中间件
const bodyParser = require('koa-bodyparser')
// 处理跨域使用 koa2-cors
const cors = require('koa2-cors')
const Router = require('koa-router')

app.use(bodyParser())
app.use(cors())

// 引入路由组件（1）
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')

// 装载所有子路由（2）
let router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;
(async () => {
  await connect()
  initSchemas()

  // 下面注释的用于测试 是否能保存数据
  //   const User = mongoose.model('User')
  //   let oneUser = new User({
  //     userName: 'xiejianhua01',
  //     password: '123456'
  //   })
  //   oneUser.save().then(() => {
  //     console.log('插入成功')
  //   }).catch(error => {
  //     throw error
  //   })
})()

app.use(async (ctx) => {
  ctx.body = '<h1>欢迎来到后台服务</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
