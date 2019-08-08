const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
// 引入加盐加密
const bcrypt = require('bcrypt')
// 设置加盐强度
const SALT_WORK_FACTOR = 10

// 创建我们的用户Schema
const userSchema = new Schema({
  // 定义字符类型
  UserId: ObjectId,
  userName: {
    unique: true,
    type: String
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
}, {
  collation: 'user'
})

// 保存注册密码
userSchema.pre('save', function (next) {
  // 先进行加盐处理
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    // 进行加密处理
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

// 使用userSchema的methods来对加密和加盐后的方法进行比对
userSchema.methods = {
  // 传递两个参数分别是客户端的密码和后台数据库的密码
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      // bcrypt.compare 对比新旧密码并返回回调 判断对比成功还是失败
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

// Model--将定义好的数据格式赋值给Schema
mongoose.model('User', userSchema)
