const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    company: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    skills: [],
    markets: [],
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User