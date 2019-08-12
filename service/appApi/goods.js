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

// 获取商品详细信息的接口
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({
      ID: goodsId
    }).exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

// 获取大类商品列表
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

// 获取小类商品列表
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = parseInt(ctx.request.body.categoryId)
    // let categoryId = '1'
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({
      MALL_CATEGORY_ID: categoryId
    }).exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})

// 根据商品类别获取小类商品列表
router.post('/getGoodsListByCategorySubID', async (ctx) => {
  try {
    let categorySubId = ctx.request.body.categorySubId
    let page = ctx.request.body.page
    let num = 10 // 每页显示的数量
    let start = (page - 1) * num // 从第几条数据开始显示
    // let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({
      SUB_ID: categorySubId
    }).skip(start).limit(num).exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

module.exports = router
