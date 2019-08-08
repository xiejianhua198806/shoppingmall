const mongoose = require('mongoose')
const glob = require('glob')
const {
  resolve
} = require('path')

module.exports = {
  connect: () => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect('mongodb://localhost/smile-db', {
      useNewUrlParser: true
    }, function (err) {
      if (err) {
        console.log('连接失败')
      } else {
        console.log('连接成功')
      }
    })
    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
      let db = mongoose.connection
      db.on('disconnected', () => {
        console.log('***********数据库断开***********')
        if (maxConnectTimes <= 3) {
          maxConnectTimes++
          mongoose.connect('mongodb://localhost2/smile-db', {
            useNewUrlParser: true
          }, function (err) {
            if (err) {
              console.log('连接失败--disconnected')
            } else {
              console.log('连接成功--disconnected')
            }
          })
        } else {
          // reject()
          throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
        }
      })
      db.on('error', err => {
        console.log('***********数据库错误***********')
        if (maxConnectTimes <= 3) {
          maxConnectTimes++
          mongoose.connect('mongodb://localhost2/smile-db', {
            useNewUrlParser: true
          }, function (err) {
            if (err) {
              console.log('连接失败--error')
            } else {
              console.log('连接成功--error')
            }
          })
        } else {
          reject(err)
          throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
        }
      })
      db.once('open', () => {
        console.log('MongoDB connected successfully')
        resolve()
      })
    })
  },
  initSchemas: () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
  }

}
