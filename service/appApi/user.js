const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = '这是主管登录和注册的页面'
})

// 注册
router.post('/register', async (ctx) => {
  // 取得Model
  const User = mongoose.model('User')
  // 把从前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body)
  // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

// 登录
router.post('/login', async (ctx) => {
  // 将前台返回的数据进行拆分
  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.password

  // 引入User的model
  const User = mongoose.model('User')
  // 查找用户名是否存在，如果存在开始比对密码
  await User.findOne({
    userName: userName
  }).exec().then(async (result) => {
    // 先判断用户名是否存在 接着在判断密码是否正确
    if (result) {
      // 因为是实例方法，所以要new出对象，才能调用
      let newUser = new User()
      // 调用挂载在User上面的比较方法，查找前端返回的userName的password
      await newUser.comparePassword(password, result.password).then((isMatch) => {
        // 对比成功
        ctx.body = {
          code: 200,
          message: isMatch
        }
      }).catch(err => {
        // 对比报错
        ctx.body = {
          code: 500,
          message: err
        }
      })
    } else {
      ctx.body = {
        code: 500,
        message: '用户名不存在'
      }
    }
  }).catch(err => {
    console.log(err)
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

module.exports = router
