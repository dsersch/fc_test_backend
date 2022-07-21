const express = require('express')
const marketController = require('../controllers/marketController.js')

const router = express.Router()

router
    .route('/')
    .post(marketController.createMarket)
    .get(marketController.findAllMarkets)

router
    .route('/:id')
    .get(marketController.findMarket)

module.exports = router