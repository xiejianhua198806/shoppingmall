const Router = require('koa-router');
const router = new Router();

const monngoose = require('mongoose');
const fs = require('fs');

// router.get('/insertAllGoodsInfo', async (ctx) => {
// 	fs.readFile('./data_json/newGoods.json', 'utf8', function(err, data) {
// 		console.log(err);
// 		console.log(data);
// 	});
// 	ctx.body = '开始导入数据';
// });

router.get('/', async (ctx) => {
    ctx.body = '这是用户操作111首页'
})
module.exports = router;