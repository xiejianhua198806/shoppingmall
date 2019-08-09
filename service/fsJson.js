const fs = require('fs')
// esLint 如果你在函数参数体内写了err这个参数，如果在下面没有用到它就会报错
fs.readFile('./data_json/goods.json', 'utf-8', function (err, data) {
  console.log(err)
  let newData = JSON.parse(data)
  let newData2 = newData.RECORDS
  let pushData = []
  let i = 0
  newData2.map(function (value, index) {
    if (value.IMAGE1 != null) {
      pushData.push(value)
    }
  })
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), function (err) {
    if (err) {
      console.log('写文件操作失败')
    } else {
      console.log('写文件操作成功')
    }
  })
})
