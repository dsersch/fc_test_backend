const express = require('express')
const startupController = require('../controllers/startupController.js')
const userController = require('../controllers/userController.js')

const router = express.Router()

router
    .route('/')
    .get(startupController.findAllStartups)
    .post(userController.protect, startupController.createStartup)

router
    .route('/:id')
    .get(startupController.findStartup)
    .patch(startupController.updateStartup)
    .delete(startupController.deleteStartup)

module.exports = router