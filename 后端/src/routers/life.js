const express = require('express')
const server = require('../server/server')
const router = express.Router()
//充值校园卡
router.post('/card',server.card)
//充值电费
router.post('/elec',server.elec)
//查询校园卡记录
router.post('/cardrecord',server.cardrecord)
//查询电费记录
router.post('/elecrecord',server.elecrecord)

module.exports = router;