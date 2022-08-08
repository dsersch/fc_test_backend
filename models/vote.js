const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    startup: {
        type: mongoose.Types.ObjectId,
        ref: 'Startup',
        required: true,
    },
    votingMember: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

const Vote = mongoose.model('Vote', voteSchema)
module.exports = Vote