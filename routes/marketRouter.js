const express = require('express')
const marketController = require('../controllers/marketController.js')

router = express.Router()

router
    .route('/')
    .post(marketController.createMarket)

module.exports = router