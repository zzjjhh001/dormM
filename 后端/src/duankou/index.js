var express =require('express')
var cors = require('cors')
var multer = require('multer')
var app = express()
//数据处理：转换前端传来的content-type=application/json的数据，使用req.body获取
app.use(express.json())
//数据处理：转换前端传来的content-type=application/x-www-form-urlencoded的数据，使用req.body获取
app.use(express.urlencoded({ extended: false }));
var upload = multer()
app.use(upload.any())
app.use(cors())//跨域
app.use('*',require('../token/index'))
app.use('/student',require('../routers/student'))
app.use('/building',require('../routers/building'))
app.use('/stuloginverify',require('../routers/stulogin'))
app.use('/adminloginverify',require('../routers/adminlogin'))
app.use('/personal',require('../routers/personal'))
app.use('/dorm',require('../routers/dorm'))
app.use('/building',require('../routers/building'))
app.use('/baoxiu',require('../routers/baoxiu'))
app.use('/life',require('../routers/life'))
// const sj = require('../db/index')
// app.get('/student/select',function(req,res){
//   sj.select((result)=>{
//     res.jsonp(result)
//   })
// })
app.use(express.static('../build'))
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(`应用实例，访问地址为 http://${host}:${port}`)
})
