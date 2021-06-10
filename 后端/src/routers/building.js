const express = require('express')
const server = require('../server/server')
const router = express.Router()
//查询
router.post('/select',server.buildingSelect)
//增加
router.post('/add',server.buildingAdd)
//修改
// router.post(`/update/:id`,server.studentUpdate)
//删除
router.delete(`/delete/:id`,server.buildingDelete)

module.exports = router;