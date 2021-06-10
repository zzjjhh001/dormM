const express = require('express')
const server = require('../server/server')
const router = express.Router()

router.post('/select',server.personalList)
router.post('/updatepwd',server.updatepwd)

module.exports = router;