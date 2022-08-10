const express = require('express')
const marketController = require('../controllers/marketController.js')
const userController = require('../controllers/userController.js')

const router = express.Router()

router
    .route('/')
    .post(marketController.createMarket)
    .get(marketController.findAllMarkets)

router
    .route('/:id')
    .get(marketController.findMarket)
    .patch(marketController.updateMarket)
    .delete(marketController.deleteMarket)

router
    .route('/update/:id')
    .patch(userController.protect, marketController.addMarketMemberList)
    .delete(userController.protect, marketController.removeMarketMemberList)

module.exports = router