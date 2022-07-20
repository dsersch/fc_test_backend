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