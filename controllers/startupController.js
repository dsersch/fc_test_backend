const mongoose = require('mongoose')
const Startup = require('../models/startup.js')

exports.createStartup = async (req, res) => {
    try {
        const newStartup = await Startup.create({
            name: req.body.name,
            status: 'Not Pitched',
            founder: req.body.founder,
            founderEmail: req.body.founderEmail,
            market: req.body.market,
            companyDescription: req.body.companyDescription,
            website: req.body.website,
            deckLink: req.body.deckLink,
            deckPassword: req.body.deckPassword,
            fundingRound: req.body.fundingRound,
            revenueStage: req.body.revenueStage,
            raiseAmount: req.body.raiseAmount,
            valuation: req.body.valuation,
            googleDriveLink: req.body.googleDriveLink,
            pitchVideoLink: req.body.pitchVideoLink,
            memo: req.body.memo,
            onePagerLink: req.body.onePagerLink,
            notes: req.body.notes,
            rerferringMember: req.user._id
        })

        res.status(201).json({
            status: 'success',
            data: newStartup,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "failed",
            message: "failed to create startup..."
        })
    }
}

exports.findAllStartups = async (req, res) => {
    try {
        const allStartups = await Startup.find()

        res.status(200).json({
            status: 'success',
            data: allStartups
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to find startups...'
        })
    }
}

exports.findStartup = async (req, res) => {
    try {
        const foundStartup = await Startup.findById(req.params.id).populate('pod')

        res.status(200).json({
            status: 'success',
            data: foundStartup,
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to find Startup...'
        })
    }
}

exports.updateStartup = async (req, res) => {
    try {
        const updatedStartup = await Startup.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            status: 'success',
            data: updatedStartup
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'failed to update startup...'
        })
    }
}

exports.deleteStartup = async (req, res) => {
    try {
        await Startup.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
            message: 'successfuly deleted startup...'
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to delete that startup...'
        })
    }
}