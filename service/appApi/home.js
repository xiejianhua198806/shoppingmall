const Router = require('koa-router')

let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = '这是home页接口，用于测试'
})

module.exports = router
