const mongoose = require('mongoose')

const startUpSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    founder: {
        type: String,
        required: true,
    },
    founderEmail: {
        type: String,
        required: true,
        unique: true,
    },
    market: {
        type: String,
        required: true,
    },
    companyDescription: String,
    website: {
        type: String, 
        required: true,
    },
    // assuming decks will be stored on S3, and we can use a link to that...
    deckFileS3: String,

    deckLink: String,
    deckPassword: String,
    fundingRound: String,
    revenueStage: String,
    raiseAmount: Number,
    valuation: Number,
    googleDriveLink: String,
    pitchVideoLink: String,
    memo: String,
    onePagerLink: String,
    notes: String,

    referringMember: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },

    // pod logic pre save???
    pod: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Vote',
    }],
}, {
    timestamps: true,
})

const Startup = mongoose.model("Startup", startUpSchema)

module.exports =  Startup