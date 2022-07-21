const mongoose = require('mongoose')

const marketSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    membersList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
})

const Market = mongoose.model('Market', marketSchema)
module.exports = Market