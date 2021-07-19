const express = require('express')
const router = express.Router()
const { router: ThoughtModule } = require('./thought.route')
const { router: UserModule } = require('./user.route')

router.use('/users/', UserModule)
router.use('/thoughts/', ThoughtModule)

module.exports = { router }
