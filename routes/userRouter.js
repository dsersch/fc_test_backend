const express = require('express')
const userController = require('../controllers/userController.js')

const router = express.Router()

// authentication and logged in routes...
router
    .route('/register')
    .post(userController.registerNewUser)

router
    .route('/login')
    .post(userController.login)

router
    .route('/profile')
    .get(userController.protect, userController.findUser)
    .patch(userController.protect, userController.updateUser)
    

// testing routes, no login needed...
router
    .route('/')
    .get(userController.findAllUsers)

router
    .route('/:id')
    // .get(userController.findUser)
    // .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router