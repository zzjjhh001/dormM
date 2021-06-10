const express = require('express')
const server = require('../server/server')
const router = express.Router()

router.post('/',server.stuLogin)

module.exports = router;