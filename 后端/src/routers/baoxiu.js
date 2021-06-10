const express = require('express')
const server = require('../server/server')
const router = express.Router()
//查询
router.post('/select',server.baoxiuSelect)
//增加
router.post('/add',server.baoxiuAdd)
//修改
router.post('/update',server.baoxiuUpdate)
module.exports = router;