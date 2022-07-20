const express = require('express')
const userController = require('../controllers/userController.js')

const router = express.Router()

router
    .route('/')
    .post(userController.createUser)
    .get(userController.findAllUsers)

router
    .route('/:id')
    .get(userController.findUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router