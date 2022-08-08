const express = require('express')
const voteController = require('../controllers/voteController.js')
const userController = require('../controllers/userController.js')

const router = express.Router()

router
    .route('/')
    .get(voteController.findAllVotes)
    .post(userController.protect, voteController.createVote)

router
    .route('/:id')
    .get(voteController.findVote)
    .patch(voteController.updateVote)
    .delete(voteController.deleteVote)

module.exports = router