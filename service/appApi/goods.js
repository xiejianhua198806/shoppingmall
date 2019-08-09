const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = '这是商品页，用于测试的页面'
})

// 导入数据必须使用get方法
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf-8', function (err, data) {
    console.log(err)
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = '开始导入数据'
})

// 保存商品大类的数据
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf-8', function (err, data) {
    console.log(err)
    let newData = JSON.parse(data)
    let newData2 = newData.RECORDS
    let saveCount = 0
    const Category = mongoose.model('Category')
    newData2.map((value, index) => {
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = '开始导入商品类大数据'
})

// 保存商品子类的数据
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf-8', function (err, data) {
    console.log(err)
    let newData = JSON.parse(data)
    let newData2 = newData.RECORDS
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    newData2.map((value, index) => {
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = '开始导入商品子类大数据'
})

// ***获取商品详细信息的接口
router.post('/getDetailGoodsInfo', async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  await Goods.findOne({
    ID: goodsId
  }).exec()
    .then(async (result) => {
      ctx.body = {
        code: 200,
        message: result
      }
    })
    .catch(error => {
      console.log(error)
      ctx.body = {
        code: 500,
        message: error
      }
    })
})

module.exports = router
